import { ClientRepository } from "../../client/repositories/ClientRepository";
import { AuthService } from "../services/AuthService";
import { Request, Response } from "express";

export class AuthController {
  private static authService = new AuthService(new ClientRepository());

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const result = await AuthController.authService.login(email, password);
      return res.status(200).json({ message: "usuário logado", usuario: result });
    } catch (error) {
      if (error instanceof Error) return res.status(400).json({ message: error.message });
    }
  }
}
