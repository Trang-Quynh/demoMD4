import { Request, Response } from "express";
declare class ProductController {
    private productService;
    private categoryService;
    constructor();
    showList: (req: Request, res: Response) => Promise<void>;
    showFormAdd: (req: Request, res: Response) => Promise<void>;
    addProduct: (req: Request, res: Response) => Promise<void>;
    deleteProduct: (req: Request, res: Response) => Promise<void>;
    showFormEdit: (req: Request, res: Response) => Promise<void>;
    updateProduct: (req: Request, res: Response) => Promise<void>;
}
declare const _default: ProductController;
export default _default;
