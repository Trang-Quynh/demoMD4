import {User} from "../entity/user";
import {Product} from "../entity/product";
import {Cart} from "../entity/cart";


class UserService {

    constructor() {
    }
    getAll = async () => {
        let users = await User.find()
        return users;
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
        const cart = await Cart.findOne({user_id});
        const product = await Product.findById(product_id);

        if (!product) {
            throw new Error('Product not found');
        }

        let cartItem = cart.cart_items.find(item => item.product_id.equals(product._id));

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cartItem = {
                product_id: product._id,
                quantity: 1
            };
            cart.cart_items.push(cartItem);
        }

        cart.total_price += product.price;

        await cart.save();

    }
}

export default new UserService();