import {model, Schema} from 'mongoose'
// export interface ICart{
//     name: string;
// }

const CartSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cart_items: [{
        product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    total_price: { type: Number, required: true },
});

const Cart = model('Cart', CartSchema);
export {Cart}