"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    user_id: { type: String, ref: 'User' },
    cart_items: [{
            product_id: { type: String, ref: 'Product' },
            price: { type: Number, ref: 'Product.price' },
            image: { type: String, ref: 'Product.image' },
            name: { type: String, ref: 'Product.name' },
            quantity: Number,
            total_price_product: Number,
        }],
    total_price: Number,
    paymentStatus: {
        type: String,
        enum: ['paid', 'unpaid']
    }
});
const Cart = (0, mongoose_1.model)('Cart', CartSchema);
exports.Cart = Cart;
//# sourceMappingURL=cart.js.map