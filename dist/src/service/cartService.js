"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = require("../entity/cart");
class CartService {
    constructor() {
        this.createNewCart = async (user) => {
            await cart_1.Cart.create({
                user_id: user._id,
                cart_items: [],
                total_price: 0
            }, function (err, newCart) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(newCart);
                }
            });
        };
    }
}
exports.default = new CartService();
//# sourceMappingURL=cartService.js.map