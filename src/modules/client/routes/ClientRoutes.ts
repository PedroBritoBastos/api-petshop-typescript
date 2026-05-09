import { Router } from "express";
import { ClientController } from "../controllers/ClientController";
import { ClientControllerMiddleware } from "../middlewares/ClientControllerMiddleware";
import { Multer } from "../../../shared/utils/Multer";

export class ClientRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initialize();
  }

  private initialize() {
    this.router.get("/clients", ClientController.getAll);

    this.router.post(
      "/clients/register",
      ClientControllerMiddleware.validateData,
      ClientController.create,
    );

    this.router.delete(
      "/clients/delete/:id",
      ClientControllerMiddleware.validateToken,
      ClientController.deleteById,
    );

    // single() -> valor do atributo "name" no frontend
    this.router.post(
      "/clients/upload/:id",
      Multer.upload.single("clientPhoto"),
      ClientController.uploadPhoto,
    );
  }
}
