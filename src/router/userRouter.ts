import {Router} from "express";
import userController from "../controller/userController";
const userRouter = Router();

userRouter.get('/', userController.showList);
userRouter.post('/', userController.addNewProduct);
userRouter.get('/login', userController.showFormLogin);
userRouter.post('/login', userController.login);
userRouter.get('/signup', userController.showFormSignup);
userRouter.post('/signup', userController.signup);
userRouter.get('/shoppingCart', userController.showShoppingCart);
userRouter.post('/shoppingCart', userController.deleteACart_items);


export default userRouter