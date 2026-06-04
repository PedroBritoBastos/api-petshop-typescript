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
    try {
      // recuperando o token do cookie
      const token = JwtProvider.getClientToken(req);

      // decodificando o token
      const decoded = JwtProvider.verifyToken(token) as TokenPayload;

      // verificando se o usuário é o mesmo que está querendo acessar o recurso
      const id = req.params.id as string;

      if (id && id !== decoded.id) {
        console.log(id);
        console.log(decoded.id);
        return res.status(403).json({
          message: "Sem autorização",
        });
      }
      return next();
    } catch (error) {
      return res.status(401).json({
        message: "Token inválido ou não fornecido",
      });
    }
  }
}
