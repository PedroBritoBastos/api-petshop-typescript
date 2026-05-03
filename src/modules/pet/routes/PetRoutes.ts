import { Router } from "express";
import { PetController } from "../controllers/PetController";
import { PetMiddleware } from "../middlewares/PetMiddleware";

export class PetRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initialize();
  }

  private initialize() {
    this.router.post(
      "/pets",
      PetMiddleware.verifyIfClientIsLogged,
      PetMiddleware.validateData,
      PetController.create,
    );
  }
}
