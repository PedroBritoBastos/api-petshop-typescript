import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { AuthControllerMiddleware } from "../middlewares/AuthControllerMiddleware";
var AuthRoutes = /** @class */ (function () {
    function AuthRoutes() {
        this.router = Router();
        this.initialize();
    }
    AuthRoutes.prototype.initialize = function () {
        this.router.post("/auth/login", AuthControllerMiddleware.validateData, AuthController.login);
        this.router.post("/auth/logout", AuthController.logout);
        this.router.get("/auth/get", AuthController.getLoggedClient);
    };
    return AuthRoutes;
}());
export { AuthRoutes };
