import {model, Schema} from 'mongoose'
export interface ICart{
    user_id: string;
    cart_items: [{
        product_id: string
        quantity: number;
    }],
    total_price: number;
}

const CartSchema = new Schema<ICart>({
    user_id: { type: String, ref: 'User'},
    cart_items: [{
        product_id: { type: String, ref: 'Product'},
        quantity: Number,
    }],
    total_price: Number
});

const Cart = model('Cart', CartSchema);
export {Cart}