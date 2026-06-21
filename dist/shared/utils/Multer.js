"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Multer = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class Multer {
    constructor(url) {
        this.storage = multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                // verifica se a pasta existe nesse caminho e cria a pasta caso nao exista
                if (!fs_1.default.existsSync(this.uploadPath)) {
                    fs_1.default.mkdirSync(this.uploadPath, {
                        recursive: true,
                    });
                }
                cb(null, this.uploadPath);
            },
            filename: (req, file, cb) => {
                const filename = `${Date.now()}-${file.originalname}`;
                cb(null, filename);
            },
        });
        this.upload = (0, multer_1.default)({
            storage: this.storage,
            limits: {
                fileSize: 5 * 1024 * 1024,
            },
            fileFilter: (req, file, cb) => {
                const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
                if (!allowedMimeTypes.includes(file.mimetype)) {
                    return cb(new Error("Formato de imagem inválido"));
                }
                cb(null, true);
            },
        });
        this.uploadPath = path_1.default.resolve(process.cwd(), url);
    }
}
exports.Multer = Multer;
