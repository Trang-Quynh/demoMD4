import {Cart} from "../entity/cart";


class CartService {
    constructor() {
    }

    createNewCart = async (user) => {
        await Cart.create({
            user_id: user._id,
            cart_items: [],
            total_price: 0
        }, function(err, newCart) {
            if (err) {
                console.log(err);
            } else {
                console.log(newCart);
            }
        });
    }
}

export default new CartService();
