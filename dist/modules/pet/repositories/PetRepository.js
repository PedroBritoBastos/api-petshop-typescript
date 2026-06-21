"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetRepository = void 0;
const prisma_1 = require("../../../lib/prisma");
class PetRepository {
    async create(data) {
        const pet = await prisma_1.prisma.pet.create({
            data,
        });
        return pet;
    }
    async deleteById(id) {
        const deletedPet = await prisma_1.prisma.pet.delete({
            where: { id },
        });
        return deletedPet;
    }
    async findById(id) {
        const pet = await prisma_1.prisma.pet.findUnique({
            where: { id },
        });
        return pet;
    }
    async getAll() {
        return await prisma_1.prisma.pet.findMany();
    }
    async update(id, data) {
        const updatedPet = await prisma_1.prisma.pet.update({
            where: { id },
            data,
        });
        return updatedPet;
    }
    async findByIsAdopted() {
        return await prisma_1.prisma.pet.findMany({
            where: {
                isAdopted: true,
            },
        });
    }
    async findByNotAdopted() {
        return await prisma_1.prisma.pet.findMany({
            where: {
                isAdopted: false,
            },
        });
    }
    async findByIsAdoptedByClientId(clientId) {
        return await prisma_1.prisma.pet.findMany({
            where: {
                adoptionClientId: clientId,
                isAdopted: true,
            },
        });
    }
}
exports.PetRepository = PetRepository;
