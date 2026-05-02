import { CreateClientDTO } from "../dtos/CreateClientDTO";
import { UpdateClientDTO } from "../dtos/UpdateClientDTO";
import { IClientRepository } from "./IClientRepository";
import { prisma } from "../../../lib/prisma";
import { Client } from "../../../../generated/prisma/client";

export class ClientRepository implements IClientRepository {
  async getAll(): Promise<Client[]> {
    return await prisma.client.findMany();
  }

  async create(data: CreateClientDTO): Promise<Client> {
    const client = prisma.client.create({ data });
    return client;
  }

  async findByEmail(email: string): Promise<Client | null> {
    const client = await prisma.client.findFirst({
      where: { email },
    });
    return client;
  }

  async findById(id: string, userId: string): Promise<Client | null> {
    const client = await prisma.client.findUnique({
      where: { id },
    });
    return client;
  }

  async findMany(userId: string): Promise<Client[]> {
    throw new Error("Method not implemented.");
  }

  async update(id: string, data: UpdateClientDTO): Promise<Client> {
    throw new Error("Method not implemented.");
  }

  async deleteById(id: string): Promise<void> {
    await prisma.client.delete({
      where: { id },
    });
  }
}
