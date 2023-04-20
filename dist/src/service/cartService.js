"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = require("../entity/cart");
const history_1 = require("../entity/history");
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
                    console.log('create success');
                }
            });
        };
        this.saveToHistory = async (cart_id) => {
            await history_1.History.create({
                cart_id: cart_id,
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
            await cart_1.Cart.deleteOne({
                cart_id: cart_id, function(err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('delete success');
                    }
                }
            });
        };
        this.removeToHistory = async (user_id, cart_id) => {
            cart_1.Cart.updateOne({ _id: cart_id }, { $set: { paymentStatus: "paid" } });
            await this.saveToHistory(cart_id);
            await this.deleteACart(cart_id);
            await this.createNewCart(user_id);
        };
    }
}
exports.default = new CartService();
//# sourceMappingURL=cartService.js.map