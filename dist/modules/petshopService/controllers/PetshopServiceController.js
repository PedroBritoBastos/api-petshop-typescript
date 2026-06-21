"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetshopServiceController = void 0;
class PetshopServiceController {
    constructor(petshopServiceService) {
        this.petshopServiceService = petshopServiceService;
    }
    async create(req, res) {
        const { clientId, petId, type, executionDate } = req.body;
        try {
            const data = {
                clientId,
                petId,
                type,
                executionDate,
                finished: false,
            };
            const result = await this.petshopServiceService.create(data);
            return res.status(201).json({
                message: "Serviço criado.",
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
        try {
            const result = await this.petshopServiceService.getAll();
            return res.status(200).json({
                message: "Serviços.",
                result,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
        }
    }
    async delete(req, res) {
        const id = req.params.id;
        try {
            const result = await this.petshopServiceService.deleteById(id);
            return res.status(200).json({
                message: "Serviço excluído.",
                result,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(404).json({
                    message: error.message,
                });
            }
        }
    }
    async finishService(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            const finishedPetshopService = await this.petshopServiceService.finishService(id, data);
            return res.status(200).json({ message: "Serviço finalizado com sucesso.", service: finishedPetshopService });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(404).json({ message: error.message });
            }
        }
    }
    async getClientServices(req, res) {
        try {
            const clientId = req.params.clientId;
            const services = await this.petshopServiceService.getClientServices(clientId);
            return res.status(200).json({ message: "Serviços solicitados:", result: services });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(404).json({ message: error.message });
            }
        }
    }
}
exports.PetshopServiceController = PetshopServiceController;
