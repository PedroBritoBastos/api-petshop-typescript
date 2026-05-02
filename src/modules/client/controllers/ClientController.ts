import { Request, Response } from "express";
import { Client } from "../../../../generated/prisma/client";
import { ClientRepository } from "../repositories/ClientRepository";
import { ClientService } from "../services/ClientService";

export class ClientController {
  private static clientService = new ClientService();

  static async create(
    req: Request,
    res: Response,
  ): Promise<Response | undefined> {
    const { name, email, phone, password } = req.body;

    try {
      const result = await ClientController.clientService.create(
        name,
        email,
        phone,
        password,
      );

      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }

  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const clients = await ClientController.clientService.getAll();

      return res.status(200).json(clients);
    } catch (error) {
      return res.status(400).json({ message: "Erro ao buscar clientes" });
    }
  }

  static async deleteById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id as string;

    try {
      await ClientController.clientService.deleteById(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "Erro interno" });
    }
  }
}
