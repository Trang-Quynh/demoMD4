"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productService_1 = __importDefault(require("../service/productService"));
class ProductController {
    constructor() {
        this.findAll = (req, res) => {
            let products = this.productService.getAll();
            res.render('index', { products: products });
        };
        this.deleteProduct = (req, res) => {
            let id = req.body.idDelete;
            this.productService.deleteProduct(id);
            res.redirect(301, '/products');
        };
        this.showFormAdd = (req, res) => {
            let productListLength = this.productService.getAll().length;
            res.render('product/create', { length: productListLength });
        };
        this.addProduct = (req, res) => {
            this.productService.addProduct(req.body);
            res.redirect(301, '/products');
        };
        this.showFormEdit = (req, res) => {
            let id = req.params.id;
            console.log(id);
            let product;
            for (let i = 0; i < this.productService.getAll().length; i++) {
                if (this.productService.getAll()[i].id == id) {
                    product = this.productService.getAll()[i];
                }
            }
            console.log(product);
            res.render('product/edit', { product: product });
        };
        this.updateProduct = (req, res) => {
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