import { PetshopService } from "../../../../generated/prisma/client";
import { CreatePetshopServiceDTO } from "../dtos/CreatePetshopServiceDTO";

export interface IPetshopServiceRepository {
  create(data: CreatePetshopServiceDTO): Promise<PetshopService>;
  getAll(): Promise<PetshopService[]>;
  getById(id: string): Promise<PetshopService | null>;
  deleteById(id: string): Promise<PetshopService>;
}
