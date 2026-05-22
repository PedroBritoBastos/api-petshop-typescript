import { Request, Response } from "express";
import { PetService } from "../services/PetService";

export class PetController {
  constructor(private petService: PetService) {}

  async create(req: Request, res: Response): Promise<Response | undefined> {
    const { name, age, weight } = req.body;

    const clientId = req.user.id;

    const data = {
      clientId,
      name,
      age,
      weight,
      isAdopted: false,
      imageUrl: "",
    };

    try {
      const result = await this.petService.create(data);

      return res.status(201).json({
        message: "Pet criado com sucesso.",
        result,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    }
  }

  async deleteById(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const clientId = req.user.id;

      const id = req.params.id as string;

      const result = await this.petService.deleteById(clientId, id);

      return res.status(200).json({
        message: "Pet excluído com sucesso.",
        result,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const result = await this.petService.getAll();

    return res.status(200).json({
      message: "Todos os pets.",
      result,
    });
  }

  async update(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const clientId = req.user.id;

      const id = req.params.id as string;

      const data = req.body;

      const result = await this.petService.update(id, clientId, data);

      return res.status(200).json({
        message: "Pet atualizado.",
        result,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    }
  }

  async adopt(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const clientId = req.user.id;

      const id = req.params.id as string;

      const data = {
        isAdopted: true,
      };

      const result = await this.petService.adopt(id, clientId, data);

      return res.status(200).json({
        message: "Pet adotado com sucesso.",
        result,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    }
  }

  async uploadPhoto(req: Request, res: Response): Promise<Response | undefined> {
    const id = req.params.id as string;

    const file = req.file?.filename;

    if (!file) {
      return res.status(400).json({
        message: "Nenhuma imagem enviada.",
      });
    }

    const data = {
      imageUrl: `/photos/pets/${file}`,
    };

    try {
      await this.petService.uploadPhoto(id, data);

      return res.status(200).json({
        message: "Foto adicionada com sucesso.",
        imageUrl: data.imageUrl,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          message: error.message,
        });
      }
    }
  }
}
