var PetshopServiceMiddleware = /** @class */ (function () {
    function PetshopServiceMiddleware() {
    }
    PetshopServiceMiddleware.validateData = function (req, res, next) {
        var _a = req.body, clientId = _a.clientId, petId = _a.petId, type = _a.type, executionDate = _a.executionDate;
        if (!clientId) {
            return res.status(400).json({ message: "Sem id do cliente." });
        }
        if (!petId) {
            return res.status(400).json({ message: "Sem id do pet." });
        }
        if (!type) {
            return res.status(400).json({ message: "O tipo de serviço é obrigatório." });
        }
        if (!executionDate) {
            return res.status(400).json({ message: "A data de execução é obrigatória." });
        }
        return next();
    };
    PetshopServiceMiddleware.validateUpdateData = function (req, res, next) {
        var finished = req.body.finished;
        if (!finished) {
            return res.status(400).json({ message: "Nenhum serviço finalizado." });
        }
        return next();
    };
    return PetshopServiceMiddleware;
}());
export { PetshopServiceMiddleware };
