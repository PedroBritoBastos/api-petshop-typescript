import { Pet } from "../../../../generated/prisma/client";

import { CreatePetDTO } from "../dtos/CreatePetDTO";
import { UpdatePetDTO } from "../dtos/UpdatePetDTO";

import { PetRepository } from "../repositories/PetRepository";

export class PetService {
  constructor(private petRepository: PetRepository) {}

  async create(data: CreatePetDTO): Promise<Pet> {
    return await this.petRepository.create(data);
  }

  async deleteById(clientId: string, id: string): Promise<Pet> {
    const pet = await this.petRepository.findById(id);

    if (!pet) {
      throw new Error("O pet não existe.");
    }

    if (pet.clientId !== clientId) {
      throw new Error("O pet não pertence a este cliente.");
    }

    return await this.petRepository.deleteById(id);
  }

  async getAll(): Promise<Pet[]> {
    return await this.petRepository.getAll();
  }

  async update(id: string, clientId: string, data: UpdatePetDTO): Promise<Pet> {
    const pet = await this.petRepository.findById(id);

    if (!pet) {
      throw new Error("Pet não encontrado.");
    }

    if (pet.clientId !== clientId) {
      throw new Error("Não autorizado.");
    }

    return await this.petRepository.update(id, data);
  }

  async adopt(id: string, clientId: string, data: UpdatePetDTO): Promise<Pet> {
    const pet = await this.petRepository.findById(id);

    if (!pet) {
      throw new Error("Pet não encontrado.");
    }

    if (pet.clientId === clientId) {
      throw new Error("Você não pode adotar seu próprio pet.");
    }

    return await this.petRepository.update(id, data);
  }

  async uploadPhoto(id: string, data: UpdatePetDTO): Promise<Pet> {
    const pet = await this.petRepository.findById(id);

    if (!pet) {
      throw new Error("Pet não encontrado.");
    }

    return await this.petRepository.update(id, data);
  }
}
