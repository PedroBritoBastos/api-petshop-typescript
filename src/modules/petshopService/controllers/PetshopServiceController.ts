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
      const result = this.petshopServiceService.create(data);
      return res.status(200).json({ message: "Serviço criado:", result });
    } catch (error) {
      if (error instanceof Error)
        return res.status(402).json({ message: error.message });
    }
  }
}
