import { Client } from "../../../../generated/prisma/client";
import { CreateClientDTO } from "../dtos/CreateClientDTO";
import { UpdateClientDTO } from "../dtos/UpdateClientDTO";

export interface IClientRepository {
  create(data: CreateClientDTO): Promise<Client>;
  findByEmail(email: string): Promise<Client | null>;
  findById(id: string, userId: string): Promise<Client | null>;
  findMany(userId: string): Promise<Client[]>;
  update(id: string, data: UpdateClientDTO): Promise<Client>;
  delete(id: string, userId: string): Promise<void>;
  getAll(): Promise<Client[]>;
}
