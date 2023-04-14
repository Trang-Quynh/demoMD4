declare class ProductService {
    constructor();
    getAll(): {
        id: number;
        name: string;
        price: string;
        quantity: number;
        image: string;
    }[];
    addProduct(product: any): void;
    deleteProduct(id: any): void;
    updateProduct(id: any, updateProduct: any): void;
}
declare const _default: ProductService;
export default _default;
