import { prisma } from "../../../lib/prisma";
import { Pet } from "../../../../generated/prisma/client";
import { IPetRepository } from "./IPetRepository";
import { CreatePetDTO } from "../dtos/CreatePetDTO";

export class PetRepository implements IPetRepository {
  async create(data: CreatePetDTO): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    });
    return pet;
  }
}
