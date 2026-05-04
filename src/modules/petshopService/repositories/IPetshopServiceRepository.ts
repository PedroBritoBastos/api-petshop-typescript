import { PetshopService } from "../../../../generated/prisma/client";
import { CreatePetshopServiceDTO } from "../dtos/CreatePetshopServiceDTO";

export interface IPetshopServiceRepository {
  create(data: CreatePetshopServiceDTO): Promise<PetshopService>;
}
