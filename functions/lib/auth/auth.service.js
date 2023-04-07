"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../modules/user/user.service");
const firebase_service_1 = require("./../firebase/firebase.service");
let AuthService = class AuthService {
    constructor(firebaseService, userService) {
        this.firebaseService = firebaseService;
        this.userService = userService;
    }
    async register(registerUser, idToken) {
        try {
            const result = await this.firebaseService.auth.verifyIdToken(idToken);
            if (result.email === registerUser.email) {
                if (result.email_verified)
                    return await this.userService.create(registerUser);
                else
                    throw new common_1.HttpException('You must verify your email', common_1.HttpStatus.UNAUTHORIZED);
            }
            else
                throw new common_1.HttpException('User email not match', common_1.HttpStatus.CONFLICT);
        }
        catch (error) {
            return error;
        }
    }
    async login(email, password) {
        try {
        }
        catch (error) {
            return error;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map