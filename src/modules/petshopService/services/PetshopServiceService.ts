import { PetshopServiceRepository } from "../repositories/PetshopServiceRepository";
import { CreatePetshopServiceDTO } from "../dtos/CreatePetshopServiceDTO";
import { PetshopService } from "../../../../generated/prisma/client";

export class PetshopServiceService {
  private petshopServiceRepository = new PetshopServiceRepository();

  async create(data: CreatePetshopServiceDTO): Promise<PetshopService> {
    return await this.petshopServiceRepository.create(data);
  }

  async getAll(): Promise<PetshopService[]> {
    return await this.petshopServiceRepository.getAll();
  }
}
