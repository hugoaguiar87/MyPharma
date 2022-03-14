import { Schema, model, Model, connection } from "mongoose";

export type ProductType = {
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string,
    brand: string
}

const schema = new Schema<ProductType>({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
})

const modelName: string = "Product"

export default (connection && connection.models[modelName]) ?
    connection.models[modelName] as Model<ProductType>
:
    model<ProductType>(modelName, schema)
;