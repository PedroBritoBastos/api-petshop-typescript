import { Router } from "express";
import { ClientController } from "../controllers/ClientController";
import { ClientControllerMiddleware } from "../middlewares/ClientControllerMiddleware";
import { Request, Response } from "express";

export class ClientRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initialize();
  }

  private initialize() {
    this.router.get("/clients", ClientController.getAll);

    this.router.post(
      "/clients",
      ClientControllerMiddleware.validateData,
      ClientController.create,
    );
  }
}
