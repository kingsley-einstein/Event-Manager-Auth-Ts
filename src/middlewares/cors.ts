import { Request, Response, NextFunction } from "express";

export default (origin: string, headers?: string, methods?: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", headers || "Authorization, Content-Type");
    res.header("Access-Control-Allow-Methods", methods || "GET, POST, PATCH, DELETE");
    next();
  };
};
