/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
declare class ProductService {
    constructor();
    getAll: () => Promise<(import("mongoose").Document<unknown, any, import("../entity/product").IProduct> & Omit<import("../entity/product").IProduct & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    addProduct: (product: any) => Promise<void>;
    findById: (id: any) => Promise<import("mongoose").Document<unknown, any, import("../entity/product").IProduct> & Omit<import("../entity/product").IProduct & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    deleteProductMongoo: (id: any) => Promise<void>;
    updateProduct: (id: any, updateProduct: any) => Promise<void>;
}
declare const _default: ProductService;
export default _default;
