import { PetshopServiceRepository } from "../repositories/PetshopServiceRepository";
import { CreatePetshopServiceDTO } from "../dtos/CreatePetshopServiceDTO";
import { PetshopService } from "../../../../generated/prisma/client";
import { BcryptProvider } from "../../../shared/crypto/BcryptProvider";
import { JwtProvider } from "../../../shared/auth/JwtProvider";

export class PetshopServiceService {
  private petshopServiceRepository = new PetshopServiceRepository();

  async create(data: CreatePetshopServiceDTO): Promise<PetshopService> {
    return await this.petshopServiceRepository.create(data);
  }
}
