"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientControllerMiddleware = void 0;
const JwtProvider_1 = require("../../../shared/auth/JwtProvider");
const express_validator_1 = require("express-validator");
class ClientControllerMiddleware {
    static validadePhotoData(req, res, next) {
        const file = req.file?.filename;
        if (!file) {
            return res.status(400).json({ message: "Nenhuma imagem enviada." });
        }
        return next();
    }
    static validateToken(req, res, next) {
        try {
            // recuperando o token do cookie
            const token = JwtProvider_1.JwtProvider.getClientToken(req);
            // decodificando o token
            const decoded = JwtProvider_1.JwtProvider.verifyToken(token);
            // verificando se o usuário é o mesmo que está querendo acessar o recurso
            const id = req.params.id;
            if (id && id !== decoded.id) {
                return res.status(403).json({
                    message: "Sem autorização",
                });
            }
            return next();
        }
        catch (error) {
            return res.status(401).json({
                message: "Token inválido ou não fornecido",
            });
        }
    }
}
exports.ClientControllerMiddleware = ClientControllerMiddleware;
ClientControllerMiddleware.validateData = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("O nome é obrigatório."),
    (0, express_validator_1.body)("email").notEmpty().withMessage("O email é obrigatório.").isEmail().withMessage("Email inválido."),
    (0, express_validator_1.body)("cpf").notEmpty().withMessage("O CPF é obrigatório."),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("A senha é obrigatória.")
        .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
        .withMessage("A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial."),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        next();
    },
];
