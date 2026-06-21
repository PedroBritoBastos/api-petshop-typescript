"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetMiddleware = void 0;
const JwtProvider_1 = require("../../../shared/auth/JwtProvider");
class PetMiddleware {
    static async verifyIfIsAdmin(req, res, next) {
        try {
            const token = JwtProvider_1.JwtProvider.getClientToken(req);
            const decoded = JwtProvider_1.JwtProvider.verifyToken(token);
            if (decoded.role !== "admin") {
                return res.status(403).json({
                    message: "Acesso negado.",
                });
            }
            req.user = decoded;
            return next();
        }
        catch (error) {
            return res.status(401).json({
                message: "Usuário não autenticado",
            });
        }
    }
    static async verifyIfClientIsLogged(req, res, next) {
        try {
            const token = JwtProvider_1.JwtProvider.getClientToken(req);
            const decoded = JwtProvider_1.JwtProvider.verifyToken(token);
            req.user = decoded;
            return next();
        }
        catch (error) {
            return res.status(401).json({
                message: "Usuário não autenticado",
            });
        }
    }
    static validateData(req, res, next) {
        const { name, age, weight } = req.body;
        if (!name) {
            return res.status(400).json({ message: "O nome é obrigatório." });
        }
        if (!age) {
            return res.status(400).json({ message: "A idade é obrigatória." });
        }
        if (!weight) {
            return res.status(400).json({ message: "O peso é obrigatório." });
        }
        return next();
    }
    static validadePhotoData(req, res, next) {
        const file = req.file?.filename;
        if (!file) {
            return res.status(400).json({ message: "Foto não enviada." });
        }
        return next();
    }
}
exports.PetMiddleware = PetMiddleware;
