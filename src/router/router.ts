import { Router} from "express";
import productRouter from "./productRouter";
import userRouter from "./userRouter";
import guestController from "../controller/guestController";
import userController from "../controller/userController";

const router = Router();
router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/banrau', guestController.findAll);
router.use('/logout', userController.logOut);



export default router;
