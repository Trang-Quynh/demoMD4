import {Request, Response} from "express";
import productService from "../service/productService";
import categoryService from "../service/categoryService";

class ProductController{
    private productService;
    private categoryService;
    constructor() {
        this.productService = productService
        this.categoryService = categoryService;
    }




    showList = async (req:Request, res:Response) =>{
          let limit: number;
          let offset: number;
          if(!req.query.limit || !req.query.offset) {
              limit = 3;
              offset = 0;
          } else {
              limit = parseInt(req.query.limit as string);
              offset = parseInt(req.query.offset as string);
          }
          let products = '';
          if(req.session['user']){
              if(req.query.search){
                  let keyword = req.query.search.toString();
                  products = await this.productService.findByKeywordMongoo(keyword,limit,offset);
                  res.render('index' , {products:products});
              }else{
                  products = await this.productService.getAll(limit,offset);
                  res.render('index' , {products:products});
              }
          }else{
              res.redirect(301, '/users/login')
          }
    }

    showFormAdd = async (req:Request, res:Response) =>{
        let categories = await this.categoryService.getAll()
        res.render('product/create', {categories: categories});
    }

    addProduct = async (req:Request, res:Response) =>{
        await this.productService.addProduct(req.body);
        res.redirect(301, '/products')
    }

    deleteProduct = async (req:Request, res:Response) =>{
        let id = req.body.idDelete;
        await this.productService.deleteProductMongoo(id);
        res.redirect(301, '/products')
    }

    showFormEdit = async (req:Request, res:Response) =>{
        let id = req.params.id
        let categories = await this.categoryService.getAll()
        res.render('product/edit', {product: await this.productService.findById(id), categories: categories});
    }

    updateProduct = async (req:Request, res:Response) =>{
        let id = req.params.id
        let updateProduct = req.body
        this.productService.updateProduct(id,updateProduct);
        res.redirect(301, '/products')
    }









}
export default new ProductController();