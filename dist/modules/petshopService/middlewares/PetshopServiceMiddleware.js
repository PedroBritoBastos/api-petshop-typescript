"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetshopServiceMiddleware = void 0;
class PetshopServiceMiddleware {
    static validateData(req, res, next) {
        const { clientId, petId, type, executionDate } = req.body;
        if (!clientId) {
            return res.status(400).json({ message: "Sem id do cliente." });
        }
        if (!petId) {
            return res.status(400).json({ message: "Sem id do pet." });
        }
        if (!type) {
            return res.status(400).json({ message: "O tipo de serviço é obrigatório." });
        }
        if (!executionDate) {
            return res.status(400).json({ message: "A data de execução é obrigatória." });
        }
        return next();
    }
    static validateUpdateData(req, res, next) {
        const { finished } = req.body;
        if (!finished) {
            return res.status(400).json({ message: "Nenhum serviço finalizado." });
        }
        return next();
    }
}
exports.PetshopServiceMiddleware = PetshopServiceMiddleware;
