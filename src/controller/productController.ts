import {Request, Response} from "express";
import productService from "../service/productService";

class ProductController{
    private productService;
    constructor() {
        this.productService = productService
    }
    findAll = (req:Request, res:Response) =>{
        let products = this.productService.getAll()
        res.render('index', {products: products});
    }
    deleteProduct = (req:Request, res:Response) =>{
        let id = req.body.idDelete;
        this.productService.deleteProduct(id);
        res.redirect(301, '/products')
    }

    showFormAdd = (req:Request, res:Response) =>{
        let productListLength = this.productService.getAll().length
        res.render('product/create', {length:productListLength});
    }

    addProduct = (req:Request, res:Response) =>{
        this.productService.addProduct(req.body);
        res.redirect(301, '/products')
    }

    showFormEdit = (req:Request, res:Response) =>{
        let id = req.params.id
        console.log(id)
        let product;
        for (let i = 0; i < this.productService.getAll().length; i++) {
            if(this.productService.getAll()[i].id == id){
                product = this.productService.getAll()[i];
            }
        }
        console.log(product)
        // thay vao trong file edit
        res.render('product/edit', {product: product});
    }

    updateProduct = (req:Request, res:Response) =>{
        let id = req.params.id
        let updateProduct = req.body
        this.productService.updateProduct(id,updateProduct);
        res.redirect(301, '/products')
    }





// app.get('user/:userid', (req, res) => {
//     console.log(req.params.userid) // "123"
// })


}
export default new ProductController();