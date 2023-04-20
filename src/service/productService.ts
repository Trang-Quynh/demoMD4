import {Product} from "../entity/product";


class ProductService {
    constructor() {
    }


    getAll = async (limit, offset) => {
        let products = await Product.find().populate('category').limit(limit).skip(limit*offset);
        return products;
    }
    addProduct = async (product) => {
        await Product.create(product)
    }

    findByKeywordMongoo = async (keyword, limit, offset) =>{
         let products = await Product.find({ name: { $regex: `${keyword}`, $options: 'i' } }).populate('category').limit(limit).skip(limit*offset)
         return products;
    }


    findById = async (id) => {
        let product = await Product.find({_id: id});
        return product[0];
    }


    deleteProductMongoo = async (id) => {
        await Product.deleteOne({_id: id});
    }
    updateProduct = async (id, updateProduct) => {
        await Product.updateOne({_id: id}, updateProduct);
    }
}

export default new ProductService();