"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailingModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const mailing_config_1 = require("./../utils/config/mailing.config");
const mailing_service_1 = require("./mailing.service");
let MailingModule = class MailingModule {
};
MailingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                useClass: mailing_config_1.MailerConfigService,
            }),
        ],
        providers: [mailing_service_1.MailingService],
        exports: [mailing_service_1.MailingService],
    })
], MailingModule);
exports.MailingModule = MailingModule;
//# sourceMappingURL=mailing.module.js.map