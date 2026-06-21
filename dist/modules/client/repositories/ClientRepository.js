"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRepository = void 0;
const prisma_1 = require("../../../lib/prisma");
class ClientRepository {
    async getAll() {
        return await prisma_1.prisma.client.findMany({
            where: {
                role: {
                    not: "admin",
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                cpf: true,
                imageUrl: true,
            },
        });
    }
    async create(data) {
        return await prisma_1.prisma.client.create({
            data,
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                cpf: true,
                imageUrl: true,
            },
        });
    }
    async findByEmail(email) {
        return await prisma_1.prisma.client.findFirst({ where: { email } });
    }
    async findById(id) {
        return await prisma_1.prisma.client.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                cpf: true,
                imageUrl: true,
            },
        });
    }
    async update(id, data) {
        return await prisma_1.prisma.client.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                cpf: true,
                imageUrl: true,
            },
        });
    }
    async deleteById(id) {
        await prisma_1.prisma.client.delete({
            where: { id },
        });
    }
}
exports.ClientRepository = ClientRepository;
