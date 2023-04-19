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
}
declare const _default: UserController;
export default _default;
