import { CreateClientDTO } from "../dtos/CreateClientDTO";
import { UpdateClientDTO } from "../dtos/UpdateClientDTO";
import { ClientResponseDTO } from "../dtos/ClientResponseDTO";
import { IClientRepository } from "./IClientRepository";
import { prisma } from "../../../lib/prisma";

export class ClientRepository implements IClientRepository {
  async getAll(): Promise<ClientResponseDTO[]> {
    return await prisma.client.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        cpf: true,
      },
    });
  }

  async create(data: CreateClientDTO): Promise<ClientResponseDTO> {
    return await prisma.client.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        cpf: true,
      },
    });
  }

  async findByEmail(email: string): Promise<ClientResponseDTO | null> {
    return await prisma.client.findFirst({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        cpf: true,
      },
    });
  }

  async findById(id: string): Promise<ClientResponseDTO | null> {
    return await prisma.client.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        cpf: true,
      },
    });
  }

  async update(id: string, data: UpdateClientDTO): Promise<ClientResponseDTO> {
    return await prisma.client.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        cpf: true,
      },
    });
  }

  async deleteById(id: string): Promise<void> {
    await prisma.client.delete({
      where: { id },
    });
  }
}
