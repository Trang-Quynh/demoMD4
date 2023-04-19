import {Request, Response} from "express";
import productService from "../service/productService";

class guestController{
    private productService;
    constructor() {
        this.productService = productService;
    }
    findAll = async (req:Request, res:Response) =>{
        let products = await this.productService.getAll();
        res.render('guest/guest' , {products:products});
    }

}
export default new guestController();