import { Request, Response, NextFunction } from "express";

export class AuthControllerMiddleware {
  public static validateData(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "O email é obrigatório." });
    }
    return next();
  }
}
