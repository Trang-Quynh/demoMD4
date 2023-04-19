"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRouter_1 = __importDefault(require("./productRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const guestController_1 = __importDefault(require("../controller/guestController"));
const router = (0, express_1.Router)();
router.use('/products', productRouter_1.default);
router.use('/users', userRouter_1.default);
router.use('/banrau', guestController_1.default.findAll);
exports.default = router;
//# sourceMappingURL=router.js.map