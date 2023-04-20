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
            if(user.username == 'sohee' && user.password == 'sohee'){
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
                limit = 6;
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
        let user_id = req.session['user']._id
        await this.userService.addToCart(user_id, product_id);
        res.redirect(301, `/users`)
    }

    showFormSignup = async (req:Request, res:Response) =>{
        res.render('user/signup');
    }

    signup = async (req:Request, res:Response) =>{
        let user = req.body;
            let check = await this.userService.checkPassword(user);
            if(check){
                res.redirect(301, '/users/signup');
            }else if(!user.username || !user.password){
                res.redirect(301, '/users/signup');
            }else{
                let currentUser =  await this.userService.createUser(user);
                await this.cartService.createNewCart(currentUser._id);
                res.redirect(301, '/users/login');
            }
    }

    showShoppingCart = async (req:Request, res:Response) =>{
        let user_id = req.session['user']._id;
        let cart = await this.userService.findCartByUserId(user_id);
        res.render('user/shoppingCart', {cart:cart});
    }

    deleteACart_items = async (req:Request, res:Response, user_id, cartItem_id) =>{
        await this.userService.deleteItem(user_id, cartItem_id)
        res.redirect(301,'/users/shoppingCart');
    }

    paidCart = async (req:Request, res:Response, user_id, cartId) =>{
        await cartService.moveToHistory(user_id, cartId)
        res.redirect(301,'/users/shoppingCart');
    }

    shoppingCartPost = async (req:Request, res:Response) =>{
        let user_id = req.session['user']._id;
        let cartItem_id = req.body.idDelete
        let cartId = req.body.cartId
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

        // console.log(carts[0].cart.cart_items)
        //
        // for (let i = 0; i < carts.length; i++) {
        //     for (let j = 0; j < ; j++) {
        //
        //     }
        //
        // }


        res.render('user/history', {carts:carts});
    }

    logOut = async (req:Request, res:Response) =>{
            req.session.destroy(function() {
            return res.status(200).json({status: 'success', session: 'cannot access session here'});
       })
        res.redirect(301,'/banrau');
    }



}
export default new UserController();