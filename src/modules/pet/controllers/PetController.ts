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

  static async deleteById(req: Request, res: Response) {
    try {
      const clientId = req.user.id;
      const id = req.params.id as string;
      const result = await PetController.petService.deleteById(clientId, id);
      return res
        .send(200)
        .json({ message: "Pet excluído com sucesso.", result });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    const result = await PetController.petService.getAll();
    return res.status(200).json({ message: "Todos os pets:", result });
  }

  static async update(req: Request, res: Response) {
    try {
      const clientId = req.user.id;
      const id = req.params.id as string;
      const data = req.body;
      const result = await PetController.petService.update(id, clientId, data);
      return res.status(200).json({ message: "Pet atualizado:", result });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  }

  static async adopt(req: Request, res: Response) {
    try {
      const clientId = req.user.id;
      const id = req.params.id as string;
      const data = { isAdopted: true };
      const result = await PetController.petService.update(id, clientId, data);
      return res
        .status(200)
        .json({ message: "Pet adotado com sucesso!:", result });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  }

  static async uploadPhoto(req: Request, res: Response) {
    const id = req.params.id as string;
    const file = req.file?.filename;
    const data = {
      imageUrl: `data/photos/pets/${file}`,
    };

    try {
      await PetController.petService.uploadPhoto(id, data);
      return res.status(200).json({ message: "Foto adicionada com sucesso." });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }
}
