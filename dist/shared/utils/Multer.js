import multer from "multer";
import path from "path";
import fs from "fs";
var Multer = /** @class */ (function () {
    function Multer(url) {
        var _this = this;
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
                // verifica se a pasta existe nesse caminho e cria a pasta caso nao exista
                if (!fs.existsSync(_this.uploadPath)) {
                    fs.mkdirSync(_this.uploadPath, {
                        recursive: true,
                    });
                }
                cb(null, _this.uploadPath);
            },
            filename: function (req, file, cb) {
                var filename = "".concat(Date.now(), "-").concat(file.originalname);
                cb(null, filename);
            },
        });
        this.upload = multer({
            storage: this.storage,
            limits: {
                fileSize: 5 * 1024 * 1024,
            },
            fileFilter: function (req, file, cb) {
                var allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
                if (!allowedMimeTypes.includes(file.mimetype)) {
                    return cb(new Error("Formato de imagem inválido"));
                }
                cb(null, true);
            },
        });
        this.uploadPath = path.resolve(process.cwd(), url);
    }
    return Multer;
}());
export { Multer };
