"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const ctrl_controller_1 = require("./ctrl.controller");
describe('CtrlController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [ctrl_controller_1.CtrlController],
        }).compile();
        controller = module.get(ctrl_controller_1.CtrlController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=ctrl.controller.spec.js.map