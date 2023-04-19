// import {Request, Response} from "express";
// import categoryService from "../service/categoryService";
//
//
// class CategoryController{
//     private categoryService;
//     constructor() {
//         this.categoryService = categoryService;
//     }
//     findAll = async (req:Request, res:Response) =>{
//         let categories = await this.categoryService.getAll()
//         res.render('index', {categories:categories});
//     }
//
// }
// export default new CategoryController();