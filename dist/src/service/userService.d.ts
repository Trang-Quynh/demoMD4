import mongoose from "mongoose";
declare class UserService {
    constructor();
    getAll: () => Promise<(mongoose.Document<unknown, any, import("../entity/user").IUser> & Omit<import("../entity/user").IUser & {
        _id: mongoose.Types.ObjectId;
    }, never>)[]>;
    findCartByUserId: (user_id: any) => Promise<mongoose.Document<unknown, any, import("../entity/cart").ICart> & Omit<import("../entity/cart").ICart & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    checkUser: (user: any) => Promise<mongoose.Document<unknown, any, import("../entity/user").IUser> & Omit<import("../entity/user").IUser & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    createUser: (user: any) => Promise<mongoose.Document<unknown, any, import("../entity/user").IUser> & Omit<import("../entity/user").IUser & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    addToCart: (user_id: any, product_id: any) => Promise<void>;
    deleteItem: (user_id: any, cartItem_id: any) => Promise<void>;
}
declare const _default: UserService;
export default _default;
