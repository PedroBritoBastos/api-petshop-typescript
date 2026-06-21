"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtProvider = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
/**
 * this class generates a jwt
 */
class JwtProvider {
    static generateToken(payload) {
        if (!JwtProvider.secret)
            throw new Error("Não há secret.");
        return jsonwebtoken_1.default.sign(payload, JwtProvider.secret, {
            expiresIn: "1h",
        });
    }
    static verifyToken(token) {
        if (!this.secret)
            throw new Error("Não há secret.");
        return jsonwebtoken_1.default.verify(token, this.secret);
    }
    static getClientToken(req) {
        const token = req.cookies.token;
        if (!token) {
            throw new Error("Token não fornecido.");
        }
        return token;
    }
}
exports.JwtProvider = JwtProvider;
JwtProvider.secret = process.env.JWT_SECRET;
