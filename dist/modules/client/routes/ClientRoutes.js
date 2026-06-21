"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoutes = void 0;
const express_1 = require("express");
const ClientController_1 = require("../controllers/ClientController");
const ClientControllerMiddleware_1 = require("../middlewares/ClientControllerMiddleware");
const ClientService_1 = require("../services/ClientService");
const ClientRepository_1 = require("../repositories/ClientRepository");
const Multer_1 = require("../../../shared/utils/Multer");
class ClientRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initialize();
    }
    initialize() {
        // repository
        const clientRepository = new ClientRepository_1.ClientRepository();
        // service
        const clientService = new ClientService_1.ClientService(clientRepository);
        // controller
        const clientController = new ClientController_1.ClientController(clientService);
        this.router.get("/clients", clientController.getAll.bind(clientController));
        this.router.get("/clients/:id", ClientControllerMiddleware_1.ClientControllerMiddleware.validateToken, clientController.getById.bind(clientController));
        this.router.post("/clients", ClientControllerMiddleware_1.ClientControllerMiddleware.validateData, clientController.create.bind(clientController));
        this.router.delete("/clients/:id", ClientControllerMiddleware_1.ClientControllerMiddleware.validateToken, clientController.deleteById.bind(clientController));
        this.router.post("/clients/upload/:id", new Multer_1.Multer("src/data/photos/users").upload.single("clientPhoto"), ClientControllerMiddleware_1.ClientControllerMiddleware.validateToken, ClientControllerMiddleware_1.ClientControllerMiddleware.validadePhotoData, clientController.uploadPhoto.bind(clientController));
    }
}
exports.ClientRoutes = ClientRoutes;
