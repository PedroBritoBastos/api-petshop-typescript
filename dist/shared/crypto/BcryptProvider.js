import bcrypt from "bcrypt";
/**
 * this class creates a password hash
 */
var BcryptProvider = /** @class */ (function () {
    function BcryptProvider() {
    }
    BcryptProvider.generateHash = function (password) {
        return bcrypt.hash(password, 10);
    };
    BcryptProvider.compareHash = function (password, hash) {
        return bcrypt.compare(password, hash);
    };
    return BcryptProvider;
}());
export { BcryptProvider };
