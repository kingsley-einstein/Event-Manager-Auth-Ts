import { Request, Response, NextFunction } from "express";
import helpers from "../helpers";
import db from "../db";

const { Jwt, Key } = helpers;
const { Auth, Token } = db;

export default class AuthWare {
  static async checkKeys(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { body } = req;
      const hasKeys = await Key.hasKeys(body, ["email", "password"]);
      if (!hasKeys) {
        res.status(400).json({
          statusCode: 400,
          body: "Missing required keys"
        });
        return;
      }
      next();
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  static async checkEmailExists(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      const u = await Auth.findByEmail(email);
      if (u) {
        res.status(400).json({
          statusCode: 400,
          body: "Email is already in use."
        });
        return;
      }
      next();
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  static async checkToken(req: Request | any, res: Response | any, next: NextFunction): Promise<void> {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        res.status(401).json({
          statusCode: 401,
          body: "Authorization header not present in request"
        });
        return;
      }
      if (!authorization.startsWith("Bearer")) {
        res.status(401).json({
          statusCode: 401,
          body: "Authorization header must begin with 'Bearer'"
        });
        return;
      }
      const token = authorization.substring(7, authorization.length);
      if (!token || token.trim().length === 0) {
        res.status(401).json({
          statusCode: 401,
          body: "Token is not present in authorization header"
        });
        return;
      }
      const payload = Jwt.decode(token);
      if (!payload) {
        res.status(401).json({
          statusCode: 401,
          body: "Jwt is malformed or expired."
        });
        return;
      }
      const loggedOut = await Token.findByActual(token);
      if (loggedOut) {
        res.status(401).json({
          statusCode: 401,
          body: "Only logged in users can access this resource."
        });
        return;
      }
      const user = await Auth.findByPk(payload.id);
      if (!user) {
        res.status(401).json({
          statusCode: 401,
          body: "Unable to authorize user"
        });
        return;
      }
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }
}
