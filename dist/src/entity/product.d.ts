import mongoose from 'mongoose';
export interface IProduct {
    name: string;
    price: number;
    quantity: number;
    image: string;
}
declare const Product: mongoose.Model<IProduct, {}, {}, {}, mongoose.Document<unknown, {}, IProduct> & Omit<IProduct & {
    _id: mongoose.Types.ObjectId;
}, never>, mongoose.Schema<IProduct, mongoose.Model<IProduct, any, any, any, mongoose.Document<unknown, any, IProduct> & Omit<IProduct & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IProduct, mongoose.Document<unknown, {}, mongoose.FlatRecord<IProduct>> & Omit<mongoose.FlatRecord<IProduct> & {
    _id: mongoose.Types.ObjectId;
}, never>>>;
export { Product };
