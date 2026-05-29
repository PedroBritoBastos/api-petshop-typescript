import { Request, Response, NextFunction } from "express";
import { JwtProvider } from "../../../shared/auth/JwtProvider";
import { TokenPayload } from "../types/TokenPayload";

export class ClientControllerMiddleware {
  public static validateData(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, cpf } = req.body;

    if (!name) {
      return res.status(400).json({ message: "O nome é obrigatório." });
    }

    if (!email) {
      return res.status(400).json({ message: "O email é obrigatório." });
    }

    if (!cpf) {
      return res.status(400).json({ message: "O cpf é obrigatório." });
    }

    if (!password) {
      return res.status(400).json({ message: "A senha é obrigatória." });
    }

    return next();
  }

  public static validadePhotoData(req: Request, res: Response, next: NextFunction) {
    const file = req.file?.filename;
    if (!file) {
      return res.status(400).json({ message: "Nenhuma imagem enviada." });
    }

    return next();
  }

  public static validateToken(req: Request, res: Response, next: NextFunction) {
    // recuperando o token do authHeader
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
    }
    const [, token] = authHeader.split(" ");

    try {
      // decodificando o token
      const decoded: TokenPayload = JwtProvider.verifyToken(token) as TokenPayload;

      // verificando se o usuário é o mesmo que está querendo excluir
      const id = req.params.id as string;
      if (id && id !== decoded.id) {
        return res.status(403).json({ message: "Sem autorização" });
      }

      next();
    } catch {
      return res.status(401).json({ message: "Token inválido" });
    }
  }
}
