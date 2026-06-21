"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const JwtProvider_1 = require("../../../shared/auth/JwtProvider");
const BcryptProvider_1 = require("../../../shared/crypto/BcryptProvider");
/**
 * this class deals with login and regitering clients
 */
class AuthService {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async login(email, password) {
        // validando o email
        const client = await this.clientRepository.findByEmail(email);
        if (!client) {
            throw new Error("Usuário não encontrado.");
        }
        // validando a senha
        const passwordValid = await BcryptProvider_1.BcryptProvider.compareHash(password, client.password);
        if (!passwordValid)
            throw new Error("Senha inválida.");
        // gerando um token de usuario
        const token = JwtProvider_1.JwtProvider.generateToken({
            id: client.id,
            email: client.email,
            role: client.role,
        });
        return { clientId: client.id, token };
    }
}
exports.AuthService = AuthService;
