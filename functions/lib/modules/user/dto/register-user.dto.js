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
exports.RegisterUserRequestDto = void 0;
const class_validator_1 = require("class-validator");
const validators_utils_1 = require("./../../../utils/validators.utils");
const messages_utils_1 = require("./../../../utils/messages.utils");
const regex_utils_1 = require("./../../../utils/regex.utils");
class RegisterUserRequestDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterUserRequestDto.prototype, "display_name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterUserRequestDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(8, 24),
    (0, class_validator_1.Matches)(regex_utils_1.REGEX.PASSWORD_RULE, { message: messages_utils_1.MESSAGES.PASSWORD_RULE_MESSAGE }),
    __metadata("design:type", String)
], RegisterUserRequestDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Validate)(validators_utils_1.PasswordMatchConstraint, ['password'], {
        message: messages_utils_1.MESSAGES.PASSWORD_MATCH_MESSAGE,
    }),
    __metadata("design:type", String)
], RegisterUserRequestDto.prototype, "confirm", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterUserRequestDto.prototype, "photoURL", void 0);
exports.RegisterUserRequestDto = RegisterUserRequestDto;
//# sourceMappingURL=register-user.dto.js.map