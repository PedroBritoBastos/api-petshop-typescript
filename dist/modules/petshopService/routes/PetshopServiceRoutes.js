"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetshopServiceRoutes = void 0;
const express_1 = require("express");
const PetshopServiceController_1 = require("../controllers/PetshopServiceController");
const PetshopServiceMiddleware_1 = require("../middlewares/PetshopServiceMiddleware");
const PetshopServiceService_1 = require("../services/PetshopServiceService");
const PetshopServiceRepository_1 = require("../repositories/PetshopServiceRepository");
class PetshopServiceRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initialize();
    }
    initialize() {
        // repository
        const petshopServiceRepository = new PetshopServiceRepository_1.PetshopServiceRepository();
        // service
        const petshopServiceService = new PetshopServiceService_1.PetshopServiceService(petshopServiceRepository);
        // controller
        const petshopServiceController = new PetshopServiceController_1.PetshopServiceController(petshopServiceService);
        this.router.post("/petshopServices", PetshopServiceMiddleware_1.PetshopServiceMiddleware.validateData, petshopServiceController.create.bind(petshopServiceController));
        this.router.get("/petshopServices", petshopServiceController.getAll.bind(petshopServiceController));
        this.router.get("/petshopServices/:clientId", petshopServiceController.getClientServices.bind(petshopServiceController));
        this.router.delete("/petshopServices/:id", petshopServiceController.delete.bind(petshopServiceController));
        this.router.put("/petshopServices/:id", PetshopServiceMiddleware_1.PetshopServiceMiddleware.validateUpdateData, petshopServiceController.finishService.bind(petshopServiceController));
    }
}
exports.PetshopServiceRoutes = PetshopServiceRoutes;
