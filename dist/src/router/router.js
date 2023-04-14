"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("../controller/productController"));
const router = (0, express_1.Router)();
router.get('/products', productController_1.default.findAll);
router.post('/products', productController_1.default.deleteProduct);
router.get('/create', productController_1.default.showFormAdd);
router.post('/create', productController_1.default.addProduct);
router.get('/update/:id', productController_1.default.showFormEdit);
router.post('/update/:id', productController_1.default.updateProduct);
exports.default = router;
//# sourceMappingURL=router.js.map