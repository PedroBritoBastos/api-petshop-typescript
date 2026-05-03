import jwt from "jsonwebtoken";
import { Request } from "express";

/**
 * this class generates a jwt
 */
export class JwtProvider {
  private static secret = process.env.JWT_SECRET;

  public static generateToken(payload: object): string {
    if (!JwtProvider.secret) throw new Error("Não há secret.");

    return jwt.sign(payload, JwtProvider.secret, {
      expiresIn: "1h",
    });
  }

  public static verifyToken(token: string): any {
    if (!this.secret) throw new Error("Não há secret.");
    return jwt.verify(token, this.secret);
  }

  public static getClientToken(req: Request): string {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error("Token não fornecido.");
    const [, token] = authHeader.split(" ");
    return token;
  }
}
