import {Schema, model} from 'mongoose'
import {ICart} from "./cart";
export interface IHistory{
    cart: ICart
}
const HistorySchema = new Schema<IHistory>({
    cart: {
        type:String,
        ref: 'Cart'
    }
})

const History = model('History', HistorySchema);
export {History}