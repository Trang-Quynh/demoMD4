import { Request, Response } from "express";
declare class ProductController {
    private productService;
    constructor();
    findAll: (req: Request, res: Response) => void;
    deleteProduct: (req: Request, res: Response) => void;
    showFormAdd: (req: Request, res: Response) => void;
    addProduct: (req: Request, res: Response) => void;
    showFormEdit: (req: Request, res: Response) => void;
    updateProduct: (req: Request, res: Response) => void;
}
declare const _default: ProductController;
export default _default;
