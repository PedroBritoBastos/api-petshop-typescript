import { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";

import { ClientRoutes } from "./src/modules/client/routes/ClientRoutes";
import { AuthRoutes } from "./src/modules/auth/routes/AuthRoutes";
import { PetRoutes } from "./src/modules/pet/routes/PetRoutes";
import { PetshopServiceRoutes } from "./src/modules/petshopService/routes/PetshopServiceRoutes";

/**
 * this class configures the server
 */
export default class App {
  public app: Application;
  private clientRoutes: ClientRoutes = new ClientRoutes();
  private authRoutes: AuthRoutes = new AuthRoutes();
  private petRoutes: PetRoutes = new PetRoutes();
  private petshopServiceRoutes: PetshopServiceRoutes = new PetshopServiceRoutes();

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(
      cors({
        origin: "http://localhost:4200",
      }),
    );
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use(this.clientRoutes.router);
    this.app.use(this.authRoutes.router);
    this.app.use(this.petRoutes.router);
    this.app.use(this.petshopServiceRoutes.router);
    this.app.get("/", (req: Request, res: Response) => {
      return res.send("Hello World");
    });
  }
}
