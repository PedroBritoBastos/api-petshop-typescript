import { ClientRepository } from "../repositories/ClientRepository";
import { BcryptProvider } from "../../../shared/crypto/BcryptProvider";
import { JwtProvider } from "../../../shared/auth/JwtProvider";
import { UpdateClientDTO } from "../dtos/UpdateClientDTO";

export class ClientService {
  private clientRepository = new ClientRepository();

  async create(name: string, email: string, phone: string, password: string) {
    const client = await this.clientRepository.findByEmail(email); // verificando se o usuário já existe no banco
    if (client) throw new Error("Esse usuário já existe");

    const hashedPassword = await BcryptProvider.generateHash(password); // criando hash de senha

    const createdClient = await this.clientRepository.create({
      // cria um usuário no banco
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const token = JwtProvider.generateToken({
      // gera um token de usuário
      id: createdClient.id,
      email: createdClient.email,
    });

    return { createdClient, token };
  }

  async getAll() {
    return this.clientRepository.getAll();
  }

  async deleteById(id: string) {
    return this.clientRepository.deleteById(id);
  }

  async uploadPhoto(id: string, data: UpdateClientDTO) {
    const client = await this.clientRepository.findById(id);
    if (!client) throw new Error("O cliente não existe");
    const updatedClient = await this.clientRepository.update(id, data);
  }
}
