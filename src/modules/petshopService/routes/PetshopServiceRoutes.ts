import { Router } from "express";
import { PetshopServiceController } from "../controllers/PetshopServiceController";
import { PetshopServiceMiddleware } from "../middlewares/PetshopServiceMiddleware";

export class PetshopServiceRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initialize();
  }

  private initialize() {
    this.router.post(
      "/petshopServices",
      PetshopServiceMiddleware.validateData,
      PetshopServiceController.create,
    );
  }
}
