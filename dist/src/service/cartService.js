"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = require("../entity/cart");
const history_1 = require("../entity/history");
const userService_1 = __importDefault(require("./userService"));
class CartService {
    constructor() {
        this.createNewCart = async (user_id) => {
            await cart_1.Cart.create({
                user_id: user_id,
                cart_items: [],
                total_price: 0,
                paymentStatus: 'unpaid'
            }, function (err, newCart) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('create new cart success');
                }
            });
        };
        this.saveToHistory = async (cart_id) => {
            await history_1.History.create({
                cart: cart_id,
            }, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('save success');
                }
            });
        };
        this.deleteACart = async (cart_id) => {
            console.log('delete cart id ' + cart_id);
            await cart_1.Cart.deleteOne({ cart_id: cart_id }).then(() => {
                console.log('delete success');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.updateStatus = async (user_id, cart_id) => {
            let cart = await userService_1.default.findCartByUserId(user_id);
            cart['paymentStatus'] = "paid";
            await cart_1.Cart.updateOne({ _id: cart_id }, {
                $set: cart
            }).then(() => {
                console.log('update success');
            }).catch((err) => {
                console.log(err);
            });
        };
        this.moveToHistory = async (user_id, cart_id) => {
            await this.updateStatus(user_id, cart_id);
            await this.saveToHistory(cart_id);
            await this.createNewCart(user_id);
        };
    }
}
exports.default = new CartService();
//# sourceMappingURL=cartService.js.map