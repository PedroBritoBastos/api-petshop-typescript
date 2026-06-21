import { Router } from "express";
import { ClientController } from "../controllers/ClientController";
import { ClientControllerMiddleware } from "../middlewares/ClientControllerMiddleware";
import { ClientService } from "../services/ClientService";
import { ClientRepository } from "../repositories/ClientRepository";
import { Multer } from "../../../shared/utils/Multer";
var ClientRoutes = /** @class */ (function () {
    function ClientRoutes() {
        this.router = Router();
        this.initialize();
    }
    ClientRoutes.prototype.initialize = function () {
        // repository
        var clientRepository = new ClientRepository();
        // service
        var clientService = new ClientService(clientRepository);
        // controller
        var clientController = new ClientController(clientService);
        this.router.get("/clients", clientController.getAll.bind(clientController));
        this.router.get("/clients/:id", ClientControllerMiddleware.validateToken, clientController.getById.bind(clientController));
        this.router.post("/clients", ClientControllerMiddleware.validateData, clientController.create.bind(clientController));
        this.router.delete("/clients/:id", ClientControllerMiddleware.validateToken, clientController.deleteById.bind(clientController));
        this.router.post("/clients/upload/:id", new Multer("src/data/photos/users").upload.single("clientPhoto"), ClientControllerMiddleware.validateToken, ClientControllerMiddleware.validadePhotoData, clientController.uploadPhoto.bind(clientController));
    };
    return ClientRoutes;
}());
export { ClientRoutes };
