import { Router} from "express";
import productRouter from "./productRouter";
import userRouter from "./userRouter";
import guestController from "../controller/guestController";

const router = Router();
router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/banrau', guestController.findAll)



export default router;
