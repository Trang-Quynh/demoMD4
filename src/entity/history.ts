import {Schema, model} from 'mongoose'
import {ICart} from "./cart";
export interface IHistory{
    cart_id: ICart
}
const HistorySchema = new Schema<IHistory>({
    cart_id: {
        type:String,
        ref: 'Cart'
    }
})

const History = model('History', HistorySchema);
export {History}