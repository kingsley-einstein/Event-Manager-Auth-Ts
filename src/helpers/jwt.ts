import jwt from "jsonwebtoken";
import env from "../env";

const { jwtSecret } = env;

export default class Jwt {
  static sign(payload: any): string {
    return jwt.sign(payload, jwtSecret, {
      expiresIn: "3d"
    });
  }
  static decode(token: string): string | { [key: string]: any; } | any {
    return jwt.decode(token);
  }
}
