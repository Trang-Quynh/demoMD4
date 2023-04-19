"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const userRouter = (0, express_1.Router)();
userRouter.get('/', userController_1.default.showList);
userRouter.post('/', userController_1.default.addNewProduct);
userRouter.get('/login', userController_1.default.showFormLogin);
userRouter.post('/login', userController_1.default.login);
userRouter.get('/signup', userController_1.default.showFormSignup);
userRouter.post('/signup', userController_1.default.signup);
userRouter.get('/shoppingCart', userController_1.default.showShoppingCart);
userRouter.post('/shoppingCart', userController_1.default.deleteACart_items);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map