import { Schema, model, Model, connection } from "mongoose";

type UserType = {
    name: string,
    email: string,
    password: string
}

const schema = new Schema<UserType>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

const modelName: string = "User"

export default (connection && connection.models[modelName]) ?
    connection.models[modelName] as Model<UserType>
:
    model<UserType>(modelName, schema)
;