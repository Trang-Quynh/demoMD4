import {Cart} from "../entity/cart";
import {History} from "../entity/history";
import userService from "./userService";


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
                console.log('create new cart success');
            }
        });
    }


    // luu vao trong history
    saveToHistory = async (cart_id) => {
        await History.create({
            cart: cart_id,
        }, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('save success');
            }
        });
    }

    deleteACart = async (cart_id) => {
        console.log('delete cart id ' + cart_id)
        await Cart.deleteOne(
            { cart_id: cart_id }
        ).then(()=>{
            console.log('delete success')
        }).catch((err)=>{
            console.log(err)
        })

    }

    updateStatus = async (user_id, cart_id) => {
        let cart = await userService.findCartByUserId(user_id);
        cart['paymentStatus'] = "paid";
        await Cart.updateOne(
            { _id: cart_id },
            {
                $set: cart
            }
        ).then(()=>{
            console.log('update success')
        }).catch((err)=>{
            console.log(err)
        })
    }

    moveToHistory = async (user_id, cart_id)=>{

        await this.updateStatus(user_id, cart_id)
        // luu vao lich su
        await this.saveToHistory(cart_id);
        //xoa gio hang cu
        // await this.deleteACart(cart_id);
        //tao gio hang moi
        await this.createNewCart(user_id);
    }




}




export default new CartService();
