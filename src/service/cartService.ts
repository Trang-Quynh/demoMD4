import {Cart} from "../entity/cart";
import {History} from "../entity/history";


class CartService {
    constructor() {
    }

    createNewCart = async (user_id) => {
        await Cart.create({
            user_id: user_id,
            cart_items: [],
            total_price: 0,
            paymentStatus:'unpaid'
        }, function(err, newCart) {
            if (err) {
                console.log(err);
            } else {
                console.log('create success');
            }
        });
    }


    // luu vao trong history
    saveToHistory = async (cart_id) => {
        await History.create({
            cart_id: cart_id,
        }, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('save success');
            }
        });
    }

    deleteACart = async (cart_id) => {
        await Cart.deleteOne({
            cart_id: cart_id,function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('delete success');
                }
            }
        });
    }

    removeToHistory = async (user_id, cart_id)=>{
        //chuyen trang thai
        Cart.updateOne(
            {_id: cart_id},
            {$set: { paymentStatus: "paid" }}
        );
        // luu vao lich su
        await this.saveToHistory(cart_id);
        //xoa gio hang cu
        await this.deleteACart(cart_id);
        //tao gio hang moi
        await this.createNewCart(user_id);
    }




}




export default new CartService();
