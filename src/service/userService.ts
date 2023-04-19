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
                price: product['price'],
                image: product['image'],
                name: product['name'],
                quantity: 1,
                total_price_product:0,
            };
            cartItem.total_price_product = cartItem.quantity * product['price'];
            cart['cart_items'].push(cartItem);
        }
        let total_price:number = 0;
        for (const item of cart['cart_items']) {
            if (product) {
                total_price += item.price * item.quantity;
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
    deleteItem = async (user_id, cartItem_id)=>{
        console.log(cartItem_id)
        const cart = await Cart.findOne({user_id: user_id});
        console.log('before' + cart['cart_items'])
        await cart['cart_items'].map((value, index)=>{
            if(cart['cart_items'][index]['_id'] == cartItem_id){
                cart['cart_items'].splice(index, 1)
            }
        })
        let total_price:number = 0;
        for (const item of cart['cart_items']) {
                total_price += item.price * item.quantity;
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



}

export default new UserService();
