"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("../controller/productController"));
const productRouter = (0, express_1.Router)();
productRouter.get('/', productController_1.default.showList);
productRouter.post('/', productController_1.default.deleteProduct);
productRouter.get('/create', productController_1.default.showFormAdd);
productRouter.post('/create', productController_1.default.addProduct);
productRouter.get('/update/:id', productController_1.default.showFormEdit);
productRouter.post('/update/:id', productController_1.default.updateProduct);
exports.default = productRouter;
//# sourceMappingURL=productRouter.js.map