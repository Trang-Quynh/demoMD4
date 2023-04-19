"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productService_1 = __importDefault(require("../service/productService"));
class guestController {
    constructor() {
        this.findAll = async (req, res) => {
            let products = await this.productService.getAll();
            res.render('guest/guest', { products: products });
        };
        this.productService = productService_1.default;
    }
}
exports.default = new guestController();
//# sourceMappingURL=guestController.js.map