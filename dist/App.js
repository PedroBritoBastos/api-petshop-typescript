"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const ClientRoutes_1 = require("./modules/client/routes/ClientRoutes");
const AuthRoutes_1 = require("./modules/auth/routes/AuthRoutes");
const PetRoutes_1 = require("./modules/pet/routes/PetRoutes");
const PetshopServiceRoutes_1 = require("./modules/petshopService/routes/PetshopServiceRoutes");
/**
 * this class configures the server
 */
class App {
    constructor() {
        this.clientRoutes = new ClientRoutes_1.ClientRoutes();
        this.authRoutes = new AuthRoutes_1.AuthRoutes();
        this.petRoutes = new PetRoutes_1.PetRoutes();
        this.petshopServiceRoutes = new PetshopServiceRoutes_1.PetshopServiceRoutes();
        this.app = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)({
            origin: "http://localhost:4200",
            credentials: true,
        }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(this.clientRoutes.router);
        this.app.use(this.authRoutes.router);
        this.app.use(this.petRoutes.router);
        this.app.use(this.petshopServiceRoutes.router);
        this.app.use("/photos", express_1.default.static(path_1.default.resolve("src/data/photos")));
        this.app.get("/", (req, res) => {
            return res.send("Hello World");
        });
    }
}
exports.default = App;
