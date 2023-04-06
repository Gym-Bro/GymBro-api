"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATIONS = void 0;
const common_1 = require("@nestjs/common");
const PASSWORD_VALIDATION = new common_1.ValidationPipe({
    errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
});
exports.VALIDATIONS = { PASSWORD_VALIDATION };
//# sourceMappingURL=validations.utils.js.map