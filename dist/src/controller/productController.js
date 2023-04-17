"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productService_1 = __importDefault(require("../service/productService"));
class ProductController {
    constructor() {
        this.findAll = async (req, res) => {
            let products = await this.productService.getAll();
            res.render('index', { products: products });
        };
        this.showFormAdd = async (req, res) => {
            let productListLength = await this.productService.getAll().length;
            res.render('product/create', { length: productListLength });
        };
        this.addProduct = async (req, res) => {
            await this.productService.addProduct(req.body);
            res.redirect(301, '/products');
        };
        this.deleteProduct = async (req, res) => {
            let id = req.body.idDelete;
            console.log(id);
            await this.productService.deleteProductMongoo(id);
            res.redirect(301, '/products');
        };
        this.showFormEdit = async (req, res) => {
            let id = req.params.id;
            res.render('product/edit', { product: await this.productService.findById(id) });
        };
        this.updateProduct = async (req, res) => {
            let id = req.params.id;
            let updateProduct = req.body;
            this.productService.updateProduct(id, updateProduct);
            res.redirect(301, '/products');
        };
        this.productService = productService_1.default;
    }
}
exports.default = new ProductController();
//# sourceMappingURL=productController.js.map