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
    this.router.get(
      "/pets",
      PetMiddleware.verifyIfClientIsLogged,
      PetController.getAll,
    );

    this.router.post(
      "/pets",
      PetMiddleware.verifyIfClientIsLogged,
      PetMiddleware.validateData,
      PetController.create,
    );

    this.router.delete(
      "/pets/:id",
      PetMiddleware.verifyIfClientIsLogged,
      PetController.deleteById,
    );

    this.router.put(
      "/pets/:id",
      PetMiddleware.verifyIfClientIsLogged,
      PetController.update,
    );

    this.router.put(
      "/pets/adoption/:id",
      PetMiddleware.verifyIfClientIsLogged,
      PetController.adopt,
    );
  }
}
