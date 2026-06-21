"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const ClientRepository_1 = require("../../client/repositories/ClientRepository");
const AuthService_1 = require("../services/AuthService");
const JwtProvider_1 = require("../../../shared/auth/JwtProvider");
class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const result = await AuthController.authService.login(email, password);
            // inserindo o token no cookie
            res.cookie("token", result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 1000 * 60 * 60,
            });
            return res.status(200).json({
                message: "Usuário logado",
                clientId: result.clientId,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            }
        }
    }
    // limpa os cookies para fazer o logout do cliente
    static async logout(req, res) {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        return res.status(200).json({ message: "Logout realizado." });
    }
    // pega o token dos cookies e retorna o payload com os dados do cliente logado
    static async getLoggedClient(req, res) {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Não autenticado",
            });
        }
        const payload = JwtProvider_1.JwtProvider.verifyToken(token);
        return res.status(200).json({
            id: payload.id,
            email: payload.email,
            role: payload.role,
        });
    }
}
exports.AuthController = AuthController;
AuthController.authService = new AuthService_1.AuthService(new ClientRepository_1.ClientRepository());
