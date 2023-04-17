import {Request, Response} from "express";
import productService from "../service/productService";

class ProductController{
    private productService;
    constructor() {
        this.productService = productService
    }
    findAll = async (req:Request, res:Response) =>{
        let products = await this.productService.getAll()
        // products.map(item =>{
        //     console.log(item._id.toString())
        // })
        res.render('index', {products: products});
    }
    showFormAdd = async (req:Request, res:Response) =>{
        let productListLength = await this.productService.getAll().length
        res.render('product/create', {length:productListLength});
    }

    addProduct = async (req:Request, res:Response) =>{
        await this.productService.addProduct(req.body);
        res.redirect(301, '/products')
    }

    deleteProduct = async (req:Request, res:Response) =>{
        let id = req.body.idDelete;
        console.log(id)
        await this.productService.deleteProductMongoo(id);
        res.redirect(301, '/products')
    }

    showFormEdit = async (req:Request, res:Response) =>{
        let id = req.params.id
        res.render('product/edit', {product: await this.productService.findById(id)});
    }

    updateProduct = async (req:Request, res:Response) =>{
        let id = req.params.id
        console.log(id)
        let updateProduct = req.body
        await this.productService.updateProductMongoo(id,updateProduct);
        res.redirect(301, '/products')
    }







}
export default new ProductController();