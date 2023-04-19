import {Request, Response} from "express";
import userService from "../service/userService";
import cartService from "../service/cartService";
import productService from "../service/productService";

class UserController{
    private userService;
    private cartService;
    private productService;
    constructor() {
        this.userService = userService;
        this.cartService = cartService;
        this.productService = productService;

    }
    showFormLogin = async (req:Request, res:Response) =>{
        res.render('user/login');
    }

    login = async (req:Request, res:Response) =>{
        let user = await this.userService.checkUser(req.body);
        if (!user){
            res.redirect(301, '/users/login');
        }else{
            if(user.username == 'sohee' && user.password == '123'){
                req.session['user'] = user;
                res.redirect(301, '/products')
            }else{
                req.session['user'] = user;
                res.redirect(301, `/users`)
            }
        }
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
            let user = req.session['user']
            if(req.query.search){
                let keyword = req.query.search.toString();
                products = await this.productService.findByKeywordMongoo(keyword,limit,offset);
                res.render('user/indexUser' , {products:products, user:user});
            }else{
                products = await this.productService.getAll(limit,offset);
                res.render('user/indexUser' , {products:products, user:user});
            }
        }else{
            res.redirect(301, '/users/login')
        }
    }

    addNewProduct = async (req:Request, res:Response) =>{
        let product_id = req.body.product_id;
        let user_id = req.session['user']._id
        await this.userService.addToCart(user_id, product_id);
        res.redirect(301, `/users`)
    }


    showFormSignup = async (req:Request, res:Response) =>{
        res.render('user/signup');
    }

    signup = async (req:Request, res:Response) =>{
        let user = req.body;
        try{
           let currentUser =  await this.userService.createUser(user);
           await this.cartService.createNewCart(currentUser);
        }catch (err){
            console.log(err.message)
        }
        res.redirect(301, '/users/login');
    }

    showShoppingCart = async (req:Request, res:Response) =>{
        //lay product list tu gio hang
        let user_id = req.session['user']._id;
        console.log(user_id)
        //tim shopping cart theo user_id
        let cart = await this.userService.findCartByUserId(user_id);
        console.log(cart)
        res.render('user/shoppingCart', {cart:cart});
    }







}
export default new UserController();