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

export const deleteBrand = async (req: Request, res: Response) => {
    if(req.headers.authorization){
        const { idBrand } = req.query

        let brand = await Brand.findById(idBrand)

        if(brand){
            await brand.remove()
            return res.json({status: true})
        } else {
            return res.json({error: "Marca não encontrada"})
        }
    }

    res.json({error: "Não autorizado"})
}

export const getBrands = async (req: Request, res: Response) => {
    let { sort = "asc", offset = 0, limit = 20, search, id } = req.query
    let filters = {} as any
    let total = 0

    if(search){
        filters.name = {'$regex': search, '$options': 'i'}
    }

    if(id){
        filters._id = id
    }

    const brandsTotal = await Brand.find(filters)
    total = brandsTotal.length

    const brands = await Brand.find(filters)
        .sort({ name: ( sort=='desc'?-1:1 ) })
        .skip(Number(offset))
        .limit(Number(limit))

    return res.json({ brands, total })

}