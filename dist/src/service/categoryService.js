"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../entity/category");
class CategoryService {
    constructor() {
        this.getAll = async () => {
            let products = await category_1.Category.find();
            return products;
        };
    }
}
exports.default = new CategoryService();
//# sourceMappingURL=categoryService.js.map