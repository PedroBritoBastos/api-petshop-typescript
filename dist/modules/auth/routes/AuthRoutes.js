"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const AuthControllerMiddleware_1 = require("../middlewares/AuthControllerMiddleware");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initialize();
    }
    initialize() {
        this.router.post("/auth/login", AuthControllerMiddleware_1.AuthControllerMiddleware.validateData, AuthController_1.AuthController.login);
        this.router.post("/auth/logout", AuthController_1.AuthController.logout);
        this.router.get("/auth/get", AuthController_1.AuthController.getLoggedClient);
    }
}
exports.AuthRoutes = AuthRoutes;
