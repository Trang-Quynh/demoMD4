let listProduct = [
    {
        id:0,
        name: 'product 1',
        price: '2000',
        quantity: 5,
        image: 'https://satovietnhat.com.vn/Upload/images/huong-dan-lam-banh-mi-thom-ngon-bang-noi-com-dien-1.jpg'
    },
    {
        id:1,
        name: 'product 2',
        price: '2000',
        quantity: 5,
        image: 'https://satovietnhat.com.vn/Upload/images/huong-dan-lam-banh-mi-thom-ngon-bang-noi-com-dien-1.jpg'
    }
]
class ProductService{
    constructor() {
    }


    getAll(){
        return listProduct
    }

    addProduct(product){
        this.getAll().push(product)
    }


    deleteProduct(id){
        this.getAll().splice(id,1)
    }

    updateProduct(id, updateProduct){
        this.getAll()[id] = updateProduct
    }




}
export default new ProductService();