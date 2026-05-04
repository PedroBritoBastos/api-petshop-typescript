import { Request, Response } from "express";
import { PetshopService } from "../../../../generated/prisma/client";
import { PetshopServiceService } from "../services/PetshopServiceService";

export class PetshopServiceController {
  private static petshopServiceService = new PetshopServiceService();

  static async create(
    req: Request,
    res: Response,
  ): Promise<Response | undefined> {
    const { clientId, petId, type, executionDate } = req.body;

    try {
      const data = { clientId, petId, type, executionDate };
      const result =
        PetshopServiceController.petshopServiceService.create(data);
      return res.status(200).json({ message: "Serviço criado:", result });
    } catch (error) {
      if (error instanceof Error)
        return res.status(402).json({ message: error.message });
    }
  }

  static async getAll(
    req: Request,
    res: Response,
  ): Promise<Response | undefined> {
    try {
      const result =
        await PetshopServiceController.petshopServiceService.getAll();
      return res.status(200).json({ message: "serviços:", result });
    } catch (error) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });
    }
  }

  static async delete(
    req: Request,
    res: Response,
  ): Promise<Response | undefined> {
    const id = req.params.id as string;
    try {
      const result =
        await PetshopServiceController.petshopServiceService.deleteById(id);
      return res.status(200).json({ message: "Serviço excluído:", result });
    } catch (error) {
      if (error instanceof Error)
        return res.status(404).json({ message: error.message });
    }
  }
}
