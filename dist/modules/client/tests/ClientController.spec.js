"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const ClientController_1 = require("../controllers/ClientController");
(0, globals_1.describe)("Testando ClientController", () => {
    const clientController = new ClientController_1.ClientController();
    const clientDTO = {
        name: "Pedro",
        email: "pedro@email.com",
        phone: "1234564",
        cpf: "23030449",
    };
    // testando se um Client está sendo criado
});
