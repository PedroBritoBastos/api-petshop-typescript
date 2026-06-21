import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { ClientRoutes } from "./src/modules/client/routes/ClientRoutes";
import { AuthRoutes } from "./src/modules/auth/routes/AuthRoutes";
import { PetRoutes } from "./src/modules/pet/routes/PetRoutes";
import { PetshopServiceRoutes } from "./src/modules/petshopService/routes/PetshopServiceRoutes";
/**
 * this class configures the server
 */
var App = /** @class */ (function () {
    function App() {
        this.clientRoutes = new ClientRoutes();
        this.authRoutes = new AuthRoutes();
        this.petRoutes = new PetRoutes();
        this.petshopServiceRoutes = new PetshopServiceRoutes();
        this.app = express();
        this.middlewares();
        this.routes();
    }
    App.prototype.middlewares = function () {
        this.app.use(cors({
            origin: "http://localhost:4200",
            credentials: true,
        }));
        this.app.use(cookieParser());
        this.app.use(express.json());
    };
    App.prototype.routes = function () {
        this.app.use(this.clientRoutes.router);
        this.app.use(this.authRoutes.router);
        this.app.use(this.petRoutes.router);
        this.app.use(this.petshopServiceRoutes.router);
        this.app.use("/photos", express.static(path.resolve("src/data/photos")));
        this.app.get("/", function (req, res) {
            return res.send("Hello World");
        });
    };
    return App;
}());
export default App;
