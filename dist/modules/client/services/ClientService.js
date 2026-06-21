"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const BcryptProvider_1 = require("../../../shared/crypto/BcryptProvider");
const JwtProvider_1 = require("../../../shared/auth/JwtProvider");
class ClientService {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async create(name, email, phone, password, cpf, role) {
        const client = await this.clientRepository.findByEmail(email);
        if (client) {
            throw new Error("Esse usuário já existe");
        }
        const hashedPassword = await BcryptProvider_1.BcryptProvider.generateHash(password);
        if (!role) {
            role = "user";
        }
        const createdClient = await this.clientRepository.create({
            name,
            email,
            phone,
            cpf,
            password: hashedPassword,
            role,
        });
        const token = JwtProvider_1.JwtProvider.generateToken({
            id: createdClient.id,
            email: createdClient.email,
        });
        return {
            createdClient,
            token,
        };
    }
    async getAll() {
        return this.clientRepository.getAll();
    }
    async deleteById(id) {
        return this.clientRepository.deleteById(id);
    }
    async uploadPhoto(id, data) {
        const client = await this.clientRepository.findById(id);
        if (!client) {
            throw new Error("O cliente não existe");
        }
        return await this.clientRepository.update(id, data);
    }
    async getById(id) {
        return await this.clientRepository.findById(id);
    }
}
exports.ClientService = ClientService;
