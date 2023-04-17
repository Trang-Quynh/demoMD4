import {Product} from "../entity/product";


class ProductService {
    constructor() {
    }


    getAll = async () => {
        let products = await Product.find();
        return products;
    }
    addProduct = async (product) => {
        await Product.create(product)
    }
    findById = async (id) => {
        let product = await Product.find({_id: `${id}`});
        return product[0];
    }
    deleteProductMongoo = async (id) => {
        await Product.deleteOne({_id: `${id}`});
    }
    updateProductMongoo = async (id, updateProduct) => {
       await Product.updateOne({_id: id}, updateProduct)
    }
}

export default new ProductService();