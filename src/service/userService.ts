import {User} from "../entity/user";
import {Product} from "../entity/product";
import {Cart} from "../entity/cart";
import {History} from "../entity/history";



class UserService {

    constructor() {
    }
    getAll = async () => {
        let users = await User.find()
        return users;
    }

    findCartByUserId = async (user_id) => {
        const cart = await Cart.findOne({user_id: user_id, paymentStatus:'unpaid'});
        return cart;
    }


    checkUser = async (user)=>{
        let userFind = await User.findOne({username:user.username, password: user.password})
        return userFind;
    }
    checkPassword = async (user)=>{
        let check = await User.findOne({password: user.password})
        return check;
    }



    createUser = async (user)=>{
       let createdUser = await User.create(user)
       return createdUser
    }
    addToCart = async (user_id, product_id) => {
        /*user_id = new mongoose.Types.ObjectId(user_id)*/
        const cart = await Cart.findOne({user_id: user_id, paymentStatus:'unpaid'});
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
            console.log('add a cart-item to cart success')
        }).catch((err)=>{
            console.log(err)
        })
    }
    deleteItem = async (user_id, cartItem_id)=>{
        const cart = await Cart.findOne({user_id: user_id, paymentStatus:'unpaid'});
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
            console.log('remove a cart-item success')
        }).catch((err)=>{
            console.log(err)
        })

    }

    findPaidCartByUserId = async (user_id)=>{
        let carts = await History.find({user_id: user_id, paymentStatus: 'paid'}).populate('cart');
        return carts;

    }

    // products = await Product.find({ name: { $regex: `${keyword}`, $options: 'i' } }).populate('category')








}

export default new UserService();
