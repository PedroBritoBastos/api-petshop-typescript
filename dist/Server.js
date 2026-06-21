"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
/**
 * this class starts the server
 */
class Server {
    constructor(port) {
        this.port = port;
    }
    start() {
        const appInstance = new App_1.default();
        appInstance.app.listen(this.port, () => {
            console.log(`Server rodando na porta ${this.port}`);
        });
    }
}
exports.default = Server;
