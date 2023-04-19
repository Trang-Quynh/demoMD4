import { Request, Response } from "express";
declare class guestController {
    private productService;
    constructor();
    findAll: (req: Request, res: Response) => Promise<void>;
}
declare const _default: guestController;
export default _default;
