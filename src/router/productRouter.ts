import {Router} from "express";
import productController from "../controller/productController";
import router from "./router";
const productRouter = Router();
productRouter.get('/', productController.showList);
productRouter.post('/', productController.deleteProduct);
productRouter.get('/create',productController.showFormAdd);
productRouter.post('/create',productController.addProduct);
productRouter.get('/update/:id', productController.showFormEdit);
productRouter.post('/update/:id', productController.updateProduct);
export default productRouter