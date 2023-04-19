import {User} from "../entity/user";
import {Product} from "../entity/product";
import {Cart} from "../entity/cart";
import mongoose from "mongoose";


class UserService {

    constructor() {
    }
    getAll = async () => {
        let users = await User.find()
        return users;
    }

    findCartByUserId = async (user_id) => {
        const cart = await Cart.findOne({user_id: user_id});
        return cart;
    }

    checkUser = async (user)=>{
        let userFind = await User.findOne({username:user.username, password: user.password})
        return userFind;
    }

    createUser = async (user)=>{
       let createdUser = await User.create(user)
       return createdUser
    }
    addToCart = async (user_id, product_id) => {
        /*user_id = new mongoose.Types.ObjectId(user_id)*/
        const cart = await Cart.findOne({user_id: user_id});
        const product = await Product.findById(product_id);
        if (!product) {
            throw new Error('Product not found');
        }
        let cartItem = cart['cart_items'].find(item => item.product_id == product_id);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cartItem = {
                product_id: product_id,
                quantity: 1
            };
            cart['cart_items'].push(cartItem);
        }

        let total_price:number = 0;
        for (const item of cart['cart_items']) {
            if (product) {
                // total_price += item.product_id * item.quantity;

            }
        }
        cart['total_price'] = total_price;
        await Cart.updateOne(
            { _id: cart['_id'] },
            {
                $set: cart
            }
        ).then(()=>{
            console.log('update success')
        }).catch((err)=>{
            console.log(err)
        })
    }

    getAllProductByUserId = async (user)=>{
        let createdUser = await User.create(user)
        return createdUser
    }

}

export default new UserService();

//
// {
//     _id: new ObjectId("643f693068cf61e2a489d636"),
//         user_id: '643f693068cf61e2a489d634',
//     cart_items: [],
//     total_price: 0,
//     __v: 0
// }
// {
//     _id: new ObjectId("643cf952ebb46b38776e81dc"),
//         name: 'trang1',
//     price: 5000,
//     image: 'https://firebasestorage.googleapis.com/v0/b/crud-8adf5.appspot.com/o/images%2Ftomato.jpg?alt=media&token=714b892b-4517-4a7d-aa71-fb12af2ee720'
//     ,
//     __v: 0,
//     quantity: 3,
//     category: '643e5a325ad72f675403b78a'
// }
