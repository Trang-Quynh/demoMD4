"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../entity/user");
const product_1 = require("../entity/product");
const cart_1 = require("../entity/cart");
class UserService {
    constructor() {
        this.getAll = async () => {
            let users = await user_1.User.find();
            return users;
        };
        this.findCartByUserId = async (user_id) => {
            const cart = await cart_1.Cart.findOne({ user_id: user_id });
            return cart;
        };
        this.checkUser = async (user) => {
            let userFind = await user_1.User.findOne({ username: user.username, password: user.password });
            return userFind;
        };
        this.createUser = async (user) => {
            let createdUser = await user_1.User.create(user);
            return createdUser;
        };
        this.addToCart = async (user_id, product_id) => {
            const cart = await cart_1.Cart.findOne({ user_id: user_id });
            const product = await product_1.Product.findById(product_id);
            if (!product) {
                throw new Error('Product not found');
            }
            let cartItem = cart['cart_items'].find(item => item.product_id == product_id);
            if (cartItem) {
                cartItem.quantity += 1;
            }
            else {
                cartItem = {
                    product_id: product_id,
                    quantity: 1
                };
                cart['cart_items'].push(cartItem);
            }
            let total_price = 0;
            for (const item of cart['cart_items']) {
                if (product) {
                }
            }
            cart['total_price'] = total_price;
            await cart_1.Cart.updateOne({ _id: cart['_id'] }, {
                $set: cart
            }).then(() => {
                console.log('update success');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.getAllProductByUserId = async (user) => {
            let createdUser = await user_1.User.create(user);
            return createdUser;
        };
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map