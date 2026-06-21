"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetRoutes = void 0;
const express_1 = require("express");
const PetController_1 = require("../controllers/PetController");
const PetMiddleware_1 = require("../middlewares/PetMiddleware");
const PetService_1 = require("../services/PetService");
const PetRepository_1 = require("../repositories/PetRepository");
const Multer_1 = require("../../../shared/utils/Multer");
class PetRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initialize();
    }
    initialize() {
        // repository
        const petRepository = new PetRepository_1.PetRepository();
        // service
        const petService = new PetService_1.PetService(petRepository);
        // controller
        const petController = new PetController_1.PetController(petService);
        this.router.get("/pets", PetMiddleware_1.PetMiddleware.verifyIfIsAdmin, petController.getAll.bind(petController));
        this.router.get("/pets/available", petController.getAvailablePets.bind(petController));
        this.router.get("/pets/adopted", PetMiddleware_1.PetMiddleware.verifyIfIsAdmin, petController.getAdoptedPets.bind(petController));
        this.router.get("/pets/adopted/:clientId", PetMiddleware_1.PetMiddleware.verifyIfClientIsLogged, petController.getAdoptedPetsByClientId.bind(petController));
        this.router.get("/pets/:petId", PetMiddleware_1.PetMiddleware.verifyIfClientIsLogged, petController.getPetById.bind(petController));
        this.router.post("/pets", PetMiddleware_1.PetMiddleware.verifyIfClientIsLogged, new Multer_1.Multer("src/data/photos/pets").upload.single("petPhoto"), PetMiddleware_1.PetMiddleware.validateData, PetMiddleware_1.PetMiddleware.validadePhotoData, petController.create.bind(petController));
        this.router.delete("/pets/:id", PetMiddleware_1.PetMiddleware.verifyIfClientIsLogged, petController.deleteById.bind(petController));
        this.router.put("/pets/:id", PetMiddleware_1.PetMiddleware.verifyIfClientIsLogged, petController.update.bind(petController));
        this.router.put("/pets/adoption/:id", PetMiddleware_1.PetMiddleware.verifyIfClientIsLogged, petController.adopt.bind(petController));
        this.router.post("/pets/upload/:id", new Multer_1.Multer("src/data/photos/pets").upload.single("petPhoto"), PetMiddleware_1.PetMiddleware.validadePhotoData, petController.uploadPhoto.bind(petController));
    }
}
exports.PetRoutes = PetRoutes;
