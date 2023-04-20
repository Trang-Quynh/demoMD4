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
                if (user.username == 'sohee' && user.password == 'sohee') {
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
            if (req.session['user']) {
                let limit;
                let offset;
                if (!req.query.limit || !req.query.offset) {
                    limit = 6;
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
                    res.render('user/indexUser', { products: products });
                }
                else {
                    products = await this.productService.getAll(limit, offset);
                    res.render('user/indexUser', { products: products });
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
            let check = await this.userService.checkPassword(user);
            if (check) {
                res.redirect(301, '/users/signup');
            }
            else if (!user.username || !user.password) {
                res.redirect(301, '/users/signup');
            }
            else {
                let currentUser = await this.userService.createUser(user);
                await this.cartService.createNewCart(currentUser._id);
                res.redirect(301, '/users/login');
            }
        };
        this.showShoppingCart = async (req, res) => {
            let user_id = req.session['user']._id;
            let cart = await this.userService.findCartByUserId(user_id);
            res.render('user/shoppingCart', { cart: cart });
        };
        this.deleteACart_items = async (req, res, user_id, cartItem_id) => {
            await this.userService.deleteItem(user_id, cartItem_id);
            res.redirect(301, '/users/shoppingCart');
        };
        this.paidCart = async (req, res, user_id, cartId) => {
            await cartService_1.default.moveToHistory(user_id, cartId);
            res.redirect(301, '/users/shoppingCart');
        };
        this.shoppingCartPost = async (req, res) => {
            let user_id = req.session['user']._id;
            let cartItem_id = req.body.idDelete;
            let cartId = req.body.cartId;
            if (cartItem_id) {
                await this.deleteACart_items(req, res, user_id, cartItem_id);
            }
            else if (cartId) {
                await this.paidCart(req, res, user_id, cartId);
            }
        };
        this.shoppingHistoryGet = async (req, res) => {
            let user_id = req.session['user']._id;
            let carts = await this.userService.findPaidCartByUserId(user_id);
            console.log(carts);
            res.render('user/history', { carts: carts });
        };
        this.logOut = async (req, res) => {
            req.session.destroy(function () {
                return res.status(200).json({ status: 'success', session: 'cannot access session here' });
            });
            res.redirect(301, '/banrau');
        };
        this.userService = userService_1.default;
        this.cartService = cartService_1.default;
        this.productService = productService_1.default;
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map