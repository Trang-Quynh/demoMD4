"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../entity/product");
class ProductService {
    constructor() {
        this.getAll = async (limit, offset) => {
            let products = await product_1.Product.find().populate('category').limit(limit).skip(limit * offset);
            return products;
        };
        this.addProduct = async (product) => {
            await product_1.Product.create(product);
        };
        this.findByKeywordMongoo = async (keyword, limit, offset) => {
            let products = await product_1.Product.find({ name: { $regex: `${keyword}`, $options: 'i' } }).populate('category').limit(limit).skip(limit * offset);
            return products;
        };
        this.findById = async (id) => {
            let product = await product_1.Product.find({ _id: id });
            return product[0];
        };
        this.deleteProductMongoo = async (id) => {
            await product_1.Product.deleteOne({ _id: id });
        };
        this.updateProduct = async (id, updateProduct) => {
            await product_1.Product.updateOne({ _id: id }, updateProduct);
        };
    }
}
exports.default = new ProductService();
//# sourceMappingURL=productService.js.map