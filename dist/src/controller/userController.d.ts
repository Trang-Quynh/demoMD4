import { Request, Response } from "express";
declare class UserController {
    private userService;
    private cartService;
    private productService;
    constructor();
    showFormLogin: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    showList: (req: Request, res: Response) => Promise<void>;
    addNewProduct: (req: Request, res: Response) => Promise<void>;
    showFormSignup: (req: Request, res: Response) => Promise<void>;
    signup: (req: Request, res: Response) => Promise<void>;
    showShoppingCart: (req: Request, res: Response) => Promise<void>;
    deleteACart_items: (req: Request, res: Response, user_id: any, cartItem_id: any) => Promise<void>;
    paidCart: (req: Request, res: Response, user_id: any, cartId: any) => Promise<void>;
    shoppingCartPost: (req: Request, res: Response) => Promise<void>;
    shoppingHistoryGet: (req: Request, res: Response) => Promise<void>;
    logOut: (req: Request, res: Response) => Promise<void>;
}
declare const _default: UserController;
export default _default;
