import { Request, Response } from "express";
import { Client } from "../../../../generated/prisma/client";
import { ClientRepository } from "../repositories/ClientRepository";

export class ClientController {
  private static clientRepository = new ClientRepository();

  static async create(req: Request, res: Response): Promise<Response> {
    const { name, email, phone } = req.body;

    try {
      const client = await ClientController.clientRepository.create({
        name,
        email,
        phone,
      });
      return res.status(201).json(client);
    } catch (error) {
      return res.status(400).json({ message: "Erro ao criar cliente" });
    }
  }

  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const clients: Client[] =
        await ClientController.clientRepository.getAll();

      return res
        .status(200)
        .json({ message: "clientes encontrados:", clients });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Ocorreu um erro ao buscar clientes" });
    }
  }
}
