import { Application, Request, Response } from "express";
import express from "express";

/**
 * this class configures the server
 */
export default class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      return res.send("Hello World");
    });
  }
}
