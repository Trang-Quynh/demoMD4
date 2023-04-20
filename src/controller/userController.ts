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
        if(req.session['user']){
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
            if(req.query.search){
                let keyword = req.query.search.toString();
                products = await this.productService.findByKeywordMongoo(keyword,limit,offset);
                res.render('user/indexUser' , {products:products});
            }else{
                products = await this.productService.getAll(limit,offset);
                res.render('user/indexUser' , {products:products});
            }
        }else{
            res.redirect(301, '/users/login')
        }
    }

    addNewProduct = async (req:Request, res:Response) =>{
        let product_id = req.body.product_id;
        console.log(product_id)
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
           await this.cartService.createNewCart(currentUser._id);
        }catch (err){
            console.log(err.message)
        }
        res.redirect(301, '/users/login');
    }

    showShoppingCart = async (req:Request, res:Response) =>{
        let user_id = req.session['user']._id;
        let cart = await this.userService.findCartByUserId(user_id);
        console.log(cart)
            res.render('user/shoppingCart', {cart:cart});
    }

    deleteACart_items = async (req:Request, res:Response, user_id, cartItem_id) =>{
        await this.userService.deleteItem(user_id, cartItem_id)
        res.redirect(301,'/users/shoppingCart');
    }

    paidCart = async (req:Request, res:Response, user_id, cartId) =>{
        await cartService.removeToHistory(user_id, cartId)
        res.redirect(301,'/users/shoppingCart');
    }

    shoppingCartPost = async (req:Request, res:Response) =>{
        let user_id = req.session['user']._id;
        let cartItem_id = req.body.idDelete
        let cartId = req.body.cartId
        // console.log('cartItem_id' + cartItem_id)
        // console.log('cartId' + cartId)
        // console.log('userId' + user_id)
        if(cartItem_id){
            await this.deleteACart_items(req,res, user_id, cartItem_id)
        }else if(cartId){
            await this.paidCart(req,res,user_id,cartId)
        }
    }

    shoppingHistoryGet = async (req:Request, res:Response) =>{
        let user_id = req.session['user']._id;
        let carts = await this.userService.findPaidCartByUserId(user_id);
        console.log(carts)
        // res.render('user/history');
    }










}
export default new UserController();