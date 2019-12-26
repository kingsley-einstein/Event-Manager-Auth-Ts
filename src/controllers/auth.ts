import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import db from "../db";
import BaseController from "./base";
import helpers from "../helpers";

const { Jwt } = helpers;
const { Auth, Token } = db;

export default class AuthController implements BaseController {
  public async create(req: Request | any, res: Response | any): Promise<void> {
    try {
      const { body } = req;
      const { email, id, password } = await Auth.create(body);
      const data = { email, id, token: Jwt.sign({ id, password }) };
      res.status(201).json({
        statusCode: 201,
        body: data
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await Auth.findByEmail(email);
      if (!bcrypt.compareSync(password, user.password)) {
        res.status(400).json({
          statusCode: 400,
          body: "Incorrect password."
        });
        return;
      }
      const body = { id: user.id, email: user.email, token: Jwt.sign({ id: user.id, password: user.password })};
      res.status(200).json({
        statusCode: 200,
        body
      })
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  public async get(req: Request | any, res: Response | any): Promise<void> {
    try {
      const { user } = req;
      const { id, email } = user;
      const body = { id, email };
      res.status(200).json({
        statusCode: 200,
        body
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  public async update(req: Request | any, res: Response | any): Promise<void> {
    try {
      const { body, user } = req;
      const { id } = user;
      const updated = await Auth.update(body, { where: { id }, individualHooks: true })[1][0];
      res.status(200).json({
        statusCode: 200,
        body: updated
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  public async logout(req: Request | any, res: Response | any): Promise<void> {
    try {
      const { user, token } = req;
      const loggedOut = await Token.create({ actual: token });
      if (!loggedOut) {
        res.status(500).json({
          statusCode: 500,
          body: "Unable to sign user out"
        });
        return;
      }
      res.status(200).json({
        statusCode: 200,
        body: `Successfully signed out user with email ${user.email}`
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }
}
