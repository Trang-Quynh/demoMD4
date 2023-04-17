"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../entity/product");
const mongoose_1 = require("mongoose");
const ObjectId = mongoose_1.Types.ObjectId;
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
            let product = await product_1.Product.find({ _id: new ObjectId(`${id}`) });
            return product[0];
        };
        this.deleteProductMongoo = async (id) => {
            await product_1.Product.deleteOne({ _id: new ObjectId(`${id}`) });
        };
        this.updateProductMongoo = async (id, updateProduct) => {
            product_1.Product.updateOne({ _id: new ObjectId(`${id}`) }, { $set: { name: `${updateProduct.name}`, price: { price: `${updateProduct.price}` }, quantity: `${updateProduct.quantity}`, image: `${updateProduct.image}` } });
        };
    }
}
exports.default = new ProductService();
//# sourceMappingURL=productService.js.map