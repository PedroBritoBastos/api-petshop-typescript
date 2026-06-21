import { Router } from "express";
import { PetshopServiceController } from "../controllers/PetshopServiceController";
import { PetshopServiceMiddleware } from "../middlewares/PetshopServiceMiddleware";
import { PetshopServiceService } from "../services/PetshopServiceService";
import { PetshopServiceRepository } from "../repositories/PetshopServiceRepository";
var PetshopServiceRoutes = /** @class */ (function () {
    function PetshopServiceRoutes() {
        this.router = Router();
        this.initialize();
    }
    PetshopServiceRoutes.prototype.initialize = function () {
        // repository
        var petshopServiceRepository = new PetshopServiceRepository();
        // service
        var petshopServiceService = new PetshopServiceService(petshopServiceRepository);
        // controller
        var petshopServiceController = new PetshopServiceController(petshopServiceService);
        this.router.post("/petshopServices", PetshopServiceMiddleware.validateData, petshopServiceController.create.bind(petshopServiceController));
        this.router.get("/petshopServices", petshopServiceController.getAll.bind(petshopServiceController));
        this.router.get("/petshopServices/:clientId", petshopServiceController.getClientServices.bind(petshopServiceController));
        this.router.delete("/petshopServices/:id", petshopServiceController.delete.bind(petshopServiceController));
        this.router.put("/petshopServices/:id", PetshopServiceMiddleware.validateUpdateData, petshopServiceController.finishService.bind(petshopServiceController));
    };
    return PetshopServiceRoutes;
}());
export { PetshopServiceRoutes };
