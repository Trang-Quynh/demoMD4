declare class CartService {
    constructor();
    createNewCart: (user_id: any) => Promise<void>;
    saveToHistory: (cart_id: any) => Promise<void>;
    deleteACart: (cart_id: any) => Promise<void>;
    updateStatus: (user_id: any, cart_id: any) => Promise<void>;
    moveToHistory: (user_id: any, cart_id: any) => Promise<void>;
}
declare const _default: CartService;
export default _default;
