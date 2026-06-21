import jwt from "jsonwebtoken";
import "dotenv/config";
/**
 * this class generates a jwt
 */
var JwtProvider = /** @class */ (function () {
    function JwtProvider() {
    }
    JwtProvider.generateToken = function (payload) {
        if (!JwtProvider.secret)
            throw new Error("Não há secret.");
        return jwt.sign(payload, JwtProvider.secret, {
            expiresIn: "1h",
        });
    };
    JwtProvider.verifyToken = function (token) {
        if (!this.secret)
            throw new Error("Não há secret.");
        return jwt.verify(token, this.secret);
    };
    JwtProvider.getClientToken = function (req) {
        var token = req.cookies.token;
        if (!token) {
            throw new Error("Token não fornecido.");
        }
        return token;
    };
    JwtProvider.secret = process.env.JWT_SECRET;
    return JwtProvider;
}());
export { JwtProvider };
