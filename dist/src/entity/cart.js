"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    user_id: { type: String, ref: 'User' },
    cart_items: [{
            product_id: { type: String, ref: 'Product' },
            quantity: Number,
        }],
    total_price: Number
});
const Cart = (0, mongoose_1.model)('Cart', CartSchema);
exports.Cart = Cart;
//# sourceMappingURL=cart.js.map