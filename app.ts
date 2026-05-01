import { Application, Request, Response } from "express";
import express from "express";

import { ClientRoutes } from "./src/modules/client/routes/clientRoutes";

/**
 * this class configures the server
 */
export default class App {
  public app: Application;
  private clientRoutes: ClientRoutes = new ClientRoutes();

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use(this.clientRoutes.router);
    this.app.get("/", (req: Request, res: Response) => {
      return res.send("Hello World");
    });
  }
}
