import { describe } from "@jest/globals";
import { ClientController } from "../controllers/ClientController";
describe("Testando ClientController", function () {
    var clientController = new ClientController();
    var clientDTO = {
        name: "Pedro",
        email: "pedro@email.com",
        phone: "1234564",
        cpf: "23030449",
    };
    // testando se um Client está sendo criado
});
