"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../entity/product");
class ProductService {
    constructor() {
        this.getAll = async () => {
            let products = await product_1.Product.find();
            return products;
        };
        this.addProduct = async (product) => {
            await product_1.Product.create(product);
        };
        this.findById = async (id) => {
            let product = await product_1.Product.find({ _id: `${id}` });
            return product[0];
        };
        this.deleteProductMongoo = async (id) => {
            await product_1.Product.deleteOne({ _id: `${id}` });
        };
        this.updateProductMongoo = async (id, updateProduct) => {
            await product_1.Product.updateOne({ _id: id }, updateProduct);
        };
    }
}
exports.default = new ProductService();
//# sourceMappingURL=productService.js.map