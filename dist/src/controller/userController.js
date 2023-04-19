"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../service/userService"));
const cartService_1 = __importDefault(require("../service/cartService"));
const productService_1 = __importDefault(require("../service/productService"));
class UserController {
    constructor() {
        this.showFormLogin = async (req, res) => {
            res.render('user/login');
        };
        this.login = async (req, res) => {
            let user = await this.userService.checkUser(req.body);
            if (!user) {
                res.redirect(301, '/users/login');
            }
            else {
                if (user.username == 'sohee' && user.password == '123') {
                    req.session['user'] = user;
                    res.redirect(301, '/products');
                }
                else {
                    req.session['user'] = user;
                    res.redirect(301, `/users`);
                }
            }
        };
        this.showList = async (req, res) => {
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
            if (req.session['user']) {
                let user = req.session['user'];
                if (req.query.search) {
                    let keyword = req.query.search.toString();
                    products = await this.productService.findByKeywordMongoo(keyword, limit, offset);
                    res.render('user/indexUser', { products: products, user: user });
                }
                else {
                    products = await this.productService.getAll(limit, offset);
                    res.render('user/indexUser', { products: products, user: user });
                }
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.addNewProduct = async (req, res) => {
            let product_id = req.body.product_id;
            let user_id = req.session['user']._id;
            await this.userService.addToCart(user_id, product_id);
            res.redirect(301, `/users`);
        };
        this.showFormSignup = async (req, res) => {
            res.render('user/signup');
        };
        this.signup = async (req, res) => {
            let user = req.body;
            try {
                let currentUser = await this.userService.createUser(user);
                await this.cartService.createNewCart(currentUser);
            }
            catch (err) {
                console.log(err.message);
            }
            res.redirect(301, '/users/login');
        };
        this.showShoppingCart = async (req, res) => {
            let user_id = req.session['user']._id;
            console.log(user_id);
            let cart = await this.userService.findCartByUserId(user_id);
            console.log(cart);
            res.render('user/shoppingCart', { cart: cart });
        };
        this.userService = userService_1.default;
        this.cartService = cartService_1.default;
        this.productService = productService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map