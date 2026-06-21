"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetshopServiceRepository = void 0;
const prisma_1 = require("../../../lib/prisma");
class PetshopServiceRepository {
    async create(data) {
        const petshopService = await prisma_1.prisma.petshopService.create({ data });
        return petshopService;
    }
    async getAll() {
        const petshopServices = await prisma_1.prisma.petshopService.findMany();
        return petshopServices;
    }
    async getById(id) {
        const petshopService = await prisma_1.prisma.petshopService.findUnique({
            where: { id },
        });
        return petshopService;
    }
    async deleteById(id) {
        const deletedPetshopService = await prisma_1.prisma.petshopService.delete({
            where: { id },
        });
        return deletedPetshopService;
    }
    async update(id, data) {
        const updatedPetshopService = await prisma_1.prisma.petshopService.update({
            where: { id },
            data,
        });
        return updatedPetshopService;
    }
    async getByClientId(clientId) {
        return await prisma_1.prisma.petshopService.findMany({
            where: {
                clientId,
            },
        });
    }
}
exports.PetshopServiceRepository = PetshopServiceRepository;
