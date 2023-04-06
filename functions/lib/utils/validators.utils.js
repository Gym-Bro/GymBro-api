"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordMatchConstraint = void 0;
const class_validator_1 = require("class-validator");
let PasswordMatchConstraint = class PasswordMatchConstraint {
    validate(value, args) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = args.object[relatedPropertyName];
        return (typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            value === relatedValue);
    }
    defaultMessage(args) {
        const [relatedPropertyName] = args.constraints;
        return `${relatedPropertyName} and ${args.property} do not match`;
    }
};
PasswordMatchConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'passwordMatch', async: false })
], PasswordMatchConstraint);
exports.PasswordMatchConstraint = PasswordMatchConstraint;
//# sourceMappingURL=validators.utils.js.map