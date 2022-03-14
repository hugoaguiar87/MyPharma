import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User, {UserType} from "../models/User";
import ProductCategory from "../models/ProductCategory";

dotenv.config()

export const createProductCategory = async (req: Request, res: Response) => {
    if(req.headers.authorization){
        const [type, token] = req.headers.authorization.split(" ")
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
        const { name, description } = req.body

        if(!name){
            return res.json({error: "Dados incompletos"})
        }

        let newCategory = await ProductCategory.create({
            name,
            description
        })
        
        res.status(201)
        return res.json({ status: true, productCategory: newCategory })
    }

    res.json({error: "Não Autorizado"})
}