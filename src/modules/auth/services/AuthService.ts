import { ClientRepository } from "../../client/repositories/ClientRepository";
import { JwtProvider } from "../../../shared/auth/JwtProvider";

/**
 * this class deals with login and regitering clients
 */
export class AuthService {
  constructor(private clientRepository: ClientRepository) {}

  async login(email: string) {
    const user = await this.clientRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const token = JwtProvider.generateToken({
      id: user.id,
      email: user.email,
    });

    return { user, token };
  }
}
