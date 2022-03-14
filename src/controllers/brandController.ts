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