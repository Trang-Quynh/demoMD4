"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    cart_items: [{
            product_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true }
        }],
    total_price: { type: Number, required: true },
});
const Cart = (0, mongoose_1.model)('Cart', CartSchema);
exports.Cart = Cart;
//# sourceMappingURL=cart.js.map