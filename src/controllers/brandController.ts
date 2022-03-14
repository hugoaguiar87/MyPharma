import { Request, Response } from "express";

import Brand from "../models/Brand";

export const createBrand = async (req: Request, res: Response) => {
    if(req.headers.authorization){
        const { name } = req.body

        if(!name){
            return res.json({error: "Dados incompletos"})
        }

        const newBrand = await Brand.create({ name })

        res.status(201)
        return res.json({ status: true, brand: newBrand })
    }

    res.json({error: "Não autorizado"})
}

export const editBrand = async (req: Request, res: Response) => {
    if(req.headers.authorization){
        const { idBrand, newName } = req.body

        let brand = await Brand.findById(idBrand)

        if(brand){
            if(newName){
                brand.name = newName
            }
            await brand.save()
            return res.json({status: true})
        } else {
            return res.json({error: "Marca não encontrada"})
        }
    }

    res.json({error: "Não autorizado"})
}