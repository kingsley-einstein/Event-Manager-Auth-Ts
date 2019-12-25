import { Request, Response } from "express";

export default interface BaseController {
  create(req: Request | any, res: Response | any): Promise<void>;
  get(req: Request | any, res: Response | any): Promise<void>;
  update(req: Request | any, res: Response | any): Promise<void>;
}
