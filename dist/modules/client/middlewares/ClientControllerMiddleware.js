import { JwtProvider } from "../../../shared/auth/JwtProvider";
import { body, validationResult } from "express-validator";
var ClientControllerMiddleware = /** @class */ (function () {
    function ClientControllerMiddleware() {
    }
    ClientControllerMiddleware.validadePhotoData = function (req, res, next) {
        var _a;
        var file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        if (!file) {
            return res.status(400).json({ message: "Nenhuma imagem enviada." });
        }
        return next();
    };
    ClientControllerMiddleware.validateToken = function (req, res, next) {
        try {
            // recuperando o token do cookie
            var token = JwtProvider.getClientToken(req);
            // decodificando o token
            var decoded = JwtProvider.verifyToken(token);
            // verificando se o usuário é o mesmo que está querendo acessar o recurso
            var id = req.params.id;
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
    };
    ClientControllerMiddleware.validateData = [
        body("name").notEmpty().withMessage("O nome é obrigatório."),
        body("email").notEmpty().withMessage("O email é obrigatório.").isEmail().withMessage("Email inválido."),
        body("cpf").notEmpty().withMessage("O CPF é obrigatório."),
        body("password")
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
        function (req, res, next) {
            var errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                });
            }
            next();
        },
    ];
    return ClientControllerMiddleware;
}());
export { ClientControllerMiddleware };
