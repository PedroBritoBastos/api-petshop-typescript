import { IPetshopServiceRepository } from "./IPetshopServiceRepository";
import { CreatePetshopServiceDTO } from "../dtos/CreatePetshopServiceDTO";
import { prisma } from "../../../lib/prisma";
import { PetshopService } from "../../../../generated/prisma/client";

export class PetshopServiceRepository implements IPetshopServiceRepository {
  async create(data: CreatePetshopServiceDTO): Promise<PetshopService> {
    const petshopService = await prisma.petshopService.create({ data });
    return petshopService;
  }

  async getAll(): Promise<PetshopService[]> {
    const petshopServices = await prisma.petshopService.findMany();
    return petshopServices;
  }
}
