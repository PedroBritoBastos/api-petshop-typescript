"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetController = void 0;
require("dotenv/config");
class PetController {
    constructor(petService) {
        this.petService = petService;
    }
    async create(req, res) {
        const { name, age, weight } = req.body;
        const clientId = req.user.id;
        const imageUrl = req.file ? `${process.env.API_URL}/photos/pets/${req.file.filename}` : "";
        const data = {
            clientId,
            name,
            age: Number(age),
            weight: Number(weight),
            isAdopted: false,
            imageUrl,
        };
        try {
            const result = await this.petService.create(data);
            return res.status(201).json({
                message: "Pet criado com sucesso.",
                result,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            }
        }
    }
    async deleteById(req, res) {
        try {
            const clientId = req.user.id;
            const id = req.params.id;
            const result = await this.petService.deleteById(clientId, id);
            return res.status(200).json({
                message: "Pet excluído com sucesso.",
                result,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            }
        }
    }
    async getAll(req, res) {
        const result = await this.petService.getAll();
        return res.status(200).json({
            message: "Todos os pets.",
            result,
        });
    }
    async update(req, res) {
        try {
            const clientId = req.user.id;
            const id = req.params.id;
            const data = req.body;
            const result = await this.petService.update(id, clientId, data);
            return res.status(200).json({
                message: "Pet atualizado.",
                result,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            }
        }
    }
    async adopt(req, res) {
        try {
            const adoptionClientId = req.user.id; // logged user id
            const id = req.params.id; // pet id
            // criando DTO
            const data = {
                isAdopted: true,
                adoptionClientId,
            };
            const result = await this.petService.adopt(id, adoptionClientId, data);
            return res.status(200).json({
                message: "Pet adotado com sucesso.",
                result,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            }
        }
    }
    async uploadPhoto(req, res) {
        const id = req.params.id;
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
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            }
        }
    }
    async getAvailablePets(req, res) {
        try {
            const result = await this.petService.getAvailablePets();
            return res.status(200).json({
                message: "Pets disponíveis para adoção.",
                result,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            }
        }
    }
    async getAdoptedPets(req, res) {
        try {
            const result = await this.petService.getAdoptedPets();
            return res.status(200).json({
                message: "Pets adotados.",
                result,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            }
        }
    }
    async getAdoptedPetsByClientId(req, res) {
        try {
            const clientId = req.params.clientId;
            const result = await this.petService.getAdoptedPetsByClientId(clientId);
            return res.status(200).json({
                message: "Pets adotados do cliente.",
                result,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            }
        }
    }
    async getPetById(req, res) {
        try {
            const petId = req.params.petId;
            const result = await this.petService.getById(petId);
            return res.status(200).json({
                message: "Pet:",
                result,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            }
        }
    }
}
exports.PetController = PetController;
