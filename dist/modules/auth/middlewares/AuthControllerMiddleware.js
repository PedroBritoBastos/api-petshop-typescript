"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllerMiddleware = void 0;
class AuthControllerMiddleware {
    static validateData(req, res, next) {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ message: "O email é obrigatório." });
        }
        if (!password) {
            return res.status(400).json({ message: "A senha é obrigatória." });
        }
        return next();
    }
}
exports.AuthControllerMiddleware = AuthControllerMiddleware;
