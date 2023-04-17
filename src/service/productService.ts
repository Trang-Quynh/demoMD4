import {Product} from "../entity/product";
import { Types } from 'mongoose';
const ObjectId = Types.ObjectId;

class ProductService{
    constructor() {
    }


    getAll = async () => {
        let products = await Product.find();
        return products;
    }
    addProduct = async (product) => {
       await Product.create(product)
    }
    findById = async (id) =>{
        let product = await Product.find( {_id: new ObjectId(`${id}`)});
        return product[0];
    }
    deleteProductMongoo = async (id) =>{
        await Product.deleteOne( {_id: new ObjectId(`${id}`)});
    }
    updateProductMongoo = async (id, updateProduct) =>{
        Product.updateOne({_id: new ObjectId(`${id}`)}, {$set: {name: `${updateProduct.name}`, price: {price: `${updateProduct.price}`}, quantity:`${updateProduct.quantity}`, image: `${updateProduct.image}`}})
    }
}
export default new ProductService();