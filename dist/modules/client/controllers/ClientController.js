"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    async create(req, res) {
        const { name, email, phone, password, cpf, role } = req.body;
        try {
            const result = await this.clientService.create(name, email, phone, password, cpf, role);
            return res.status(201).json(result);
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
            const clients = await this.clientService.getAll();
            return res.status(200).json(clients);
        }
        catch (error) {
            return res.status(400).json({
                message: "Erro ao buscar clientes",
            });
        }
    }
    async getById(req, res) {
        try {
            const id = req.params.id;
            const client = await this.clientService.getById(id);
            return res.status(200).json(client);
        }
        catch (error) {
            return res.status(400).json({
                message: "Erro ao buscar cliente",
            });
        }
    }
    async deleteById(req, res) {
        const id = req.params.id;
        try {
            await this.clientService.deleteById(id);
            return res.status(204).send();
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({
                    message: error.message,
                });
            }
            return res.status(500).json({
                message: "Erro interno",
            });
        }
    }
    async uploadPhoto(req, res) {
        const id = req.params.id;
        const file = req.file?.filename;
        if (!file) {
            return res.status(400).json({
                message: "Nenhuma imagem enviada",
            });
        }
        const data = {
            imageUrl: `/photos/users/${file}`,
        };
        try {
            await this.clientService.uploadPhoto(id, data);
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
}
exports.ClientController = ClientController;
