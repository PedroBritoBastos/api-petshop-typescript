import { Router } from "express";
import { PetController } from "../controllers/PetController";
import { PetMiddleware } from "../middlewares/PetMiddleware";
import { PetService } from "../services/PetService";
import { PetRepository } from "../repositories/PetRepository";
import { Multer } from "../../../shared/utils/Multer";
var PetRoutes = /** @class */ (function () {
    function PetRoutes() {
        this.router = Router();
        this.initialize();
    }
    PetRoutes.prototype.initialize = function () {
        // repository
        var petRepository = new PetRepository();
        // service
        var petService = new PetService(petRepository);
        // controller
        var petController = new PetController(petService);
        this.router.get("/pets", PetMiddleware.verifyIfIsAdmin, petController.getAll.bind(petController));
        this.router.get("/pets/available", petController.getAvailablePets.bind(petController));
        this.router.get("/pets/adopted", PetMiddleware.verifyIfIsAdmin, petController.getAdoptedPets.bind(petController));
        this.router.get("/pets/adopted/:clientId", PetMiddleware.verifyIfClientIsLogged, petController.getAdoptedPetsByClientId.bind(petController));
        this.router.get("/pets/:petId", PetMiddleware.verifyIfClientIsLogged, petController.getPetById.bind(petController));
        this.router.post("/pets", PetMiddleware.verifyIfClientIsLogged, new Multer("src/data/photos/pets").upload.single("petPhoto"), PetMiddleware.validateData, PetMiddleware.validadePhotoData, petController.create.bind(petController));
        this.router.delete("/pets/:id", PetMiddleware.verifyIfClientIsLogged, petController.deleteById.bind(petController));
        this.router.put("/pets/:id", PetMiddleware.verifyIfClientIsLogged, petController.update.bind(petController));
        this.router.put("/pets/adoption/:id", PetMiddleware.verifyIfClientIsLogged, petController.adopt.bind(petController));
        this.router.post("/pets/upload/:id", new Multer("src/data/photos/pets").upload.single("petPhoto"), PetMiddleware.validadePhotoData, petController.uploadPhoto.bind(petController));
    };
    return PetRoutes;
}());
export { PetRoutes };
