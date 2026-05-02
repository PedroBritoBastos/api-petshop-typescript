import { Request, Response, NextFunction } from "express";

export class ClientControllerMiddleware {
  public static validateData(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({ message: "O nome é obrigatório." });
    }

    if (!email) {
      return res.status(400).json({ message: "O email é obrigatório." });
    }

    if (!password) {
      return res.status(400).json({ message: "A senha é obrigatória." });
    }

    return next();
  }
}
