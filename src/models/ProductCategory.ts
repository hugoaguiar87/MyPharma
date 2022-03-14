import { Schema, model, Model, connection } from "mongoose";

type ProductCategoryType = {
    name: string,
    description: string
}

const schema = new Schema<ProductCategoryType>({
    name: { type: String, required: true },
    description: { type: String, required: false }    
})

const modelName: string = "ProductCategory"

export default (connection && connection.models[modelName]) ?
    connection.models[modelName] as Model<ProductCategoryType>
:
    model<ProductCategoryType>(modelName, schema)
;
