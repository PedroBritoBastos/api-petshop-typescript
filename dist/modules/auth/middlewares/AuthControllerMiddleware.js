var AuthControllerMiddleware = /** @class */ (function () {
    function AuthControllerMiddleware() {
    }
    AuthControllerMiddleware.validateData = function (req, res, next) {
        var _a = req.body, email = _a.email, password = _a.password;
        if (!email) {
            return res.status(400).json({ message: "O email é obrigatório." });
        }
        if (!password) {
            return res.status(400).json({ message: "A senha é obrigatória." });
        }
        return next();
    };
    return AuthControllerMiddleware;
}());
export { AuthControllerMiddleware };
