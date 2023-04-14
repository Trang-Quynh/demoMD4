import {Request, Response, Router} from "express";
import productController from "../controller/productController";

const router = Router();
router.get('/products',productController.findAll);
router.post('/products', productController.deleteProduct);
router.get('/create',productController.showFormAdd);
router.post('/create',productController.addProduct);
router.get('/update/:id', productController.showFormEdit);
router.post('/update/:id', productController.updateProduct);
export default router;
