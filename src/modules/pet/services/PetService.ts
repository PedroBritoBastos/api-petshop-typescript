import { PetRepository } from "../repositories/PetRepository";
import { CreatePetDTO } from "../dtos/CreatePetDTO";
import { UpdatePetDTO } from "../dtos/UpdatePetDTO";
import { Pet } from "../../../../generated/prisma/client";

export class PetService {
  private petRepository = new PetRepository();

  async create(data: CreatePetDTO): Promise<Pet> {
    const createdPet = await this.petRepository.create(data);
    return createdPet;
  }

  async deleteById(clientId: string, id: string): Promise<Pet> {
    const pet = await this.petRepository.findById(id);
    if (!pet) throw new Error("O pet não existe.");

    if (pet.clientId !== clientId)
      throw Error("O pet não pertence a este cliente.");

    const deletedPet = await this.petRepository.deleteById(id);
    return deletedPet;
  }

  async getAll(): Promise<Pet[]> {
    const pets = await this.petRepository.getAll();
    return pets;
  }

  async update(id: string, clientId: string, data: UpdatePetDTO): Promise<Pet> {
    const pet = await this.petRepository.findById(id);
    if (!pet) throw new Error("Pet não encontrado.");
    if (pet.clientId !== clientId) throw new Error("Não autorizado.");
    const updatedPet = await this.petRepository.update(id, data);
    return updatedPet;
  }

  async adopt(id: string, clientId: string, data: UpdatePetDTO): Promise<Pet> {
    const pet = await this.petRepository.findById(id);
    if (!pet) throw new Error("Pet não encontrado.");
    if (pet.clientId === clientId)
      throw new Error("Você não pode adotar seu próprio pet.");
    const updatedPet = await this.petRepository.update(id, data);
    return updatedPet;
  }

  async uploadPhoto(id: string, data: UpdatePetDTO) {
    const pet = await this.petRepository.findById(id);
    if (!pet) throw new Error("Pet não encontrado.");
    const updatedPet = await this.petRepository.update(id, data);
  }
}
