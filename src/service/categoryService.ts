import {Category} from "../entity/category";


class CategoryService {
    constructor() {
    }
    getAll = async () => {
        let products = await Category.find()
        return products;
    }

}

export default new CategoryService();