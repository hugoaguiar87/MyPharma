import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User, {UserType} from "../models/User";
import ProductCategory from "../models/ProductCategory";

dotenv.config()

export const createProductCategory = async (req: Request, res: Response) => {
    if(req.headers.authorization){
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

export const editProductCategory = async (req: Request, res: Response) => {
    if(req.headers.authorization){
        const [type, token] = req.headers.authorization.split(" ")
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
        const { idCategory, newName, newDescription } = req.body

        let productCategory = await ProductCategory.findById(idCategory)
        
        if(productCategory){
            if(newName){
                productCategory.name = newName
            }

            if(newDescription){
                productCategory.description = newDescription
            }

            await productCategory.save()
            return res.json({status: true})
        } else {
            return res.json({ error: "Categoria não encontrada" })
        }

    }

    res.json({error: "Não autorizado"})
}