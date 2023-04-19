import {Schema, model} from 'mongoose'
import {ICategory} from "./category";
export interface IProduct{
    name: string;
    price: number;
    quantity: number;
    image:string;
    category: ICategory
}
const ProductSchema = new Schema<IProduct>({
    name: String,
    price:Number,
    quantity: Number,
    image:String,
    category: {
        type:String,
        ref: 'Category'
    }
})

const Product = model('Product', ProductSchema);
export {Product}