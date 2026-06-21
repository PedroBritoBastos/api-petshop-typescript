"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetshopServiceService = void 0;
class PetshopServiceService {
    constructor(petshopServiceRepository) {
        this.petshopServiceRepository = petshopServiceRepository;
    }
    async create(data) {
        return await this.petshopServiceRepository.create(data);
    }
    async getAll() {
        return await this.petshopServiceRepository.getAll();
    }
    async deleteById(id) {
        const petshopService = await this.petshopServiceRepository.getById(id);
        if (!petshopService) {
            throw new Error("Serviço não encontrado.");
        }
        return await this.petshopServiceRepository.deleteById(id);
    }
    async finishService(id, data) {
        const petshopService = await this.petshopServiceRepository.getById(id);
        if (!petshopService)
            throw new Error("Serviço não encontrado.");
        return await this.petshopServiceRepository.update(id, data);
    }
    async getClientServices(clientId) {
        return await this.petshopServiceRepository.getByClientId(clientId);
    }
}
exports.PetshopServiceService = PetshopServiceService;
