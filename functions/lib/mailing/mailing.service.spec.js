"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const mailing_service_1 = require("./mailing.service");
describe('MailingService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [mailing_service_1.MailingService],
        }).compile();
        service = module.get(mailing_service_1.MailingService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=mailing.service.spec.js.map