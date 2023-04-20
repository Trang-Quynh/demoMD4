import {model, Schema} from 'mongoose'
export interface ICart{
    user_id: string;
    cart_items: [{
        product_id: string;
        price: number;
        image: string;
        name:string;
        quantity: number;
        total_price_product:number
    }],
    total_price: number;
    paymentStatus:string
}

const CartSchema = new Schema<ICart>({
    user_id: { type: String, ref: 'User'},
    cart_items: [{
        product_id: { type: String, ref: 'Product'},
        price: { type: Number, ref: 'Product.price' },
        image: { type: String, ref: 'Product.image' },
        name: { type: String, ref: 'Product.name' },
        quantity: Number,
        total_price_product:Number,
    }],
    total_price: Number,
    paymentStatus: {
        type: String,
        enum: ['paid', 'unpaid']
    }
});

const Cart = model('Cart', CartSchema);
export {Cart}