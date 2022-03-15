import { Schema, model, Model, connection } from "mongoose";

export type BrandType = {
    name: string
}

const schema = new Schema<BrandType>({
    name: { type: String, required: true }
})

const modelName: string = "Brand"

export default (connection && connection.models[modelName]) ?
    connection.models[modelName] as Model<BrandType>
:
    model<BrandType>(modelName, schema)
;