import { Request, Response } from "express";
import { PetService } from "../services/PetService";

export class PetController {
  private static petService = new PetService();

  static async create(
    req: Request,
    res: Response,
  ): Promise<Response | undefined> {
    const { name, age, weight } = req.body;
    const clientId = req.user.id;

    const data = {
      // criando CreatePetDTO
      clientId,
      name,
      age,
      weight,
      isAdopted: false,
      imageUrl: "",
    };

    try {
      const result = await PetController.petService.create(data);
      return res
        .status(201)
        .json({ message: "pet criado com sucesso:", result });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  }
}
