import {Request, Response, Router} from "express";
import productController from "../controller/productController";
import userController from "../controller/userController";
import productRouter from "./productRouter";
import userRouter from "./userRouter";

const router = Router();
router.use('/products', productRouter)
router.use('/users', userRouter)



// app.get('user/', (req, res) => {
//     console.log(req.query.userID) // "123"
//     console.log(req.query.action) // "changeProfile"
// })
export default router;
