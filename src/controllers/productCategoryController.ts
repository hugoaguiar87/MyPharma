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

export const deleteProductCategory = async (req: Request, res: Response) => {
    if(req.headers.authorization){
        const { idCategory } = req.body
        let productCategory = await ProductCategory.findById(idCategory)

        if(productCategory){
            productCategory.remove()
            return res.json({status: true})
        } else {
            return res.json({ error: "Categoria não encontrada" })
        }
    }

    res.json({error: "Não autorizado"})
}

export const getCategories = async (req: Request, res: Response) => {
    let { sort = "asc", offset = 0, limit = 20, searchName, searchDescription } = req.query
    let filters = {} as any
    let total = 0

    if(searchName){
        filters.name = {'$regex': searchName, '$options': 'i'}
    }

    if(searchDescription){
        filters.description = {'$regex': searchDescription, '$options': 'i'}
    }

    const categoriesTotal = await ProductCategory.find(filters)
    total = categoriesTotal.length

    const categories = await ProductCategory.find(filters)
        .sort({ name: ( sort=='desc'?-1:1 ) })
        .skip(Number(offset))
        .limit(Number(limit))

    return res.json({ categories, total })
}