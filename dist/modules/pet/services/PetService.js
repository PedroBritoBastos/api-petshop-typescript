"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetService = void 0;
class PetService {
    constructor(petRepository) {
        this.petRepository = petRepository;
    }
    async create(data) {
        return await this.petRepository.create(data);
    }
    async deleteById(clientId, id) {
        const pet = await this.petRepository.findById(id);
        if (!pet) {
            throw new Error("O pet não existe.");
        }
        if (pet.clientId !== clientId) {
            throw new Error("O pet não pertence a este cliente.");
        }
        return await this.petRepository.deleteById(id);
    }
    async getAll() {
        return await this.petRepository.getAll();
    }
    async getById(petId) {
        return await this.petRepository.findById(petId);
    }
    async update(id, clientId, data) {
        const pet = await this.petRepository.findById(id);
        if (!pet) {
            throw new Error("Pet não encontrado.");
        }
        if (pet.clientId !== clientId) {
            throw new Error("Não autorizado.");
        }
        return await this.petRepository.update(id, data);
    }
    async adopt(id, adoptionClientId, data) {
        const pet = await this.petRepository.findById(id);
        if (!pet) {
            throw new Error("Pet não encontrado.");
        }
        // verificando se o usuário logado está tentando adotar seu próprio pet
        if (pet.clientId === adoptionClientId) {
            throw new Error("Você não pode adotar seu próprio pet.");
        }
        return await this.petRepository.update(id, data);
    }
    async uploadPhoto(id, data) {
        const pet = await this.petRepository.findById(id);
        if (!pet) {
            throw new Error("Pet não encontrado.");
        }
        return await this.petRepository.update(id, data);
    }
    async getAvailablePets() {
        return await this.petRepository.findByNotAdopted();
    }
    async getAdoptedPets() {
        return await this.petRepository.findByIsAdopted();
    }
    async getAdoptedPetsByClientId(clientId) {
        return await this.petRepository.findByIsAdoptedByClientId(clientId);
    }
}
exports.PetService = PetService;
