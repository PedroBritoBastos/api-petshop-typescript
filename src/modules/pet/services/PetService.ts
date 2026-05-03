import { PetRepository } from "../repositories/PetRepository";
import { CreatePetDTO } from "../dtos/CreatePetDTO";
import { Pet } from "../../../../generated/prisma/client";

export class PetService {
  private petRepository = new PetRepository();

  async create(data: CreatePetDTO): Promise<Pet> {
    const createdPet = await this.petRepository.create(data);
    return createdPet;
  }
}
