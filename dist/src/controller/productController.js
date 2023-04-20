"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productService_1 = __importDefault(require("../service/productService"));
const categoryService_1 = __importDefault(require("../service/categoryService"));
class ProductController {
    constructor() {
        this.showList = async (req, res) => {
            if (req.session['user']) {
                let limit;
                let offset;
                if (!req.query.limit || !req.query.offset) {
                    limit = 3;
                    offset = 0;
                }
                else {
                    limit = parseInt(req.query.limit);
                    offset = parseInt(req.query.offset);
                }
                let products = '';
                if (req.query.search) {
                    let keyword = req.query.search.toString();
                    products = await this.productService.findByKeywordMongoo(keyword, limit, offset);
                    res.render('index', { products: products });
                }
                else {
                    products = await this.productService.getAll(limit, offset);
                    res.render('index', { products: products });
                }
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.showFormAdd = async (req, res) => {
            let categories = await this.categoryService.getAll();
            res.render('product/create', { categories: categories });
        };
        this.addProduct = async (req, res) => {
            await this.productService.addProduct(req.body);
            res.redirect(301, '/products');
        };
        this.deleteProduct = async (req, res) => {
            let id = req.body.idDelete;
            await this.productService.deleteProductMongoo(id);
            res.redirect(301, '/products');
        };
        this.showFormEdit = async (req, res) => {
            let id = req.params.id;
            let categories = await this.categoryService.getAll();
            res.render('product/edit', { product: await this.productService.findById(id), categories: categories });
        };
        this.updateProduct = async (req, res) => {
            let id = req.params.id;
            let updateProduct = req.body;
            this.productService.updateProduct(id, updateProduct);
            res.redirect(301, '/products');
        };
        this.productService = productService_1.default;
        this.categoryService = categoryService_1.default;
    }
}
exports.default = new ProductController();
//# sourceMappingURL=productController.js.map