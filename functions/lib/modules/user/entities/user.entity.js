"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const IEntity_1 = require("./../../../utils/IEntity");
const crypto_1 = require("crypto");
class User extends IEntity_1.IEntity {
    constructor(registerUser) {
        super();
        this.first_name = null;
        this.last_name = null;
        this.email = null;
        this.password = null;
        this.photo_url = null;
        this.providerId = null;
        this.email = registerUser.email;
        this.first_name = registerUser.first_name;
        this.last_name = registerUser.last_name;
        this.password = this.encryptPassword(registerUser.password, 'sha256', 'hex');
        this.photo_url = registerUser.photoURL || null;
        this.providerId = registerUser.providerId;
    }
    encryptPassword(password, algoritm, digest) {
        const hash = (0, crypto_1.createHash)(algoritm).update(password).digest(digest);
        return hash;
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map