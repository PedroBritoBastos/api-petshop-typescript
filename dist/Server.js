import App from "../App";
/**
 * this class starts the server
 */
var Server = /** @class */ (function () {
    function Server(port) {
        this.port = port;
    }
    Server.prototype.start = function () {
        var _this = this;
        var appInstance = new App();
        appInstance.app.listen(this.port, function () {
            console.log("Server rodando na porta ".concat(_this.port));
        });
    };
    return Server;
}());
export default Server;
