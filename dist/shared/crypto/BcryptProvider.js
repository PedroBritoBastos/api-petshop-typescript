"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptProvider = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * this class creates a password hash
 */
class BcryptProvider {
    static generateHash(password) {
        return bcrypt_1.default.hash(password, 10);
    }
    static compareHash(password, hash) {
        return bcrypt_1.default.compare(password, hash);
    }
}
exports.BcryptProvider = BcryptProvider;
