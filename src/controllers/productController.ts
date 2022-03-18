import { Request, Response } from "express";

import Brand from "../models/Brand";
import ProductCategory from "../models/ProductCategory";
import Product from "../models/Product";

export const createProduct = async (req: Request, res: Response) => {
    if(req.headers.authorization){
        const { name, description, price, stock, category, brand } = req.body

        if(!name){
            return res.json({error: "Dados incompletos"})
        }

        if(!price){
            return res.json({error: "Dados incompletos"})
        }

        if(!stock){
            return res.json({error: "Dados incompletos"})
        }

        if(!category){
            return res.json({error: "Dados incompletos"})
        } else {
            let categoryIsValid = await ProductCategory.findById(category)
            if(!categoryIsValid){
                return res.json({error: "Categoria inválida"})
            }
        }

        if(!brand){
            return res.json({error: "Dados incompletos"})
        } else {
            let brandIsValid = await Brand.findById(brand)
            if(!brandIsValid){
                return res.json({error: "Marca inválida"})
            }
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            stock,
            category,
            brand
        })

        res.status(201)
        return res.json({ status: true, product: newProduct })
    }

    res.json({error: "Não autorizado"})
}

export const editProduct = async (req: Request, res: Response) => {
    if(req.headers.authorization){
        const { idProduct, newName, newDescription, newPrice, newStock, newCategory, newBrand } = req.body

        let product = await Product.findById(idProduct)

        if(product){
            if(newName){
                product.name = newName
            }

            if(newDescription){
                product.description = newDescription
            }

            if(newPrice){
                product.price = newPrice
            }

            if(newStock){
                product.stock = newStock
            }

            if(newCategory){
                let categoryIsValid = await ProductCategory.findById(newCategory)
                if(!categoryIsValid){
                    return res.json({error: "Categoria inválida"})
                }
                product.category = newCategory
            }

            if(newBrand){
                let brandIsValid = await Brand.findById(newBrand)
                if(!brandIsValid){
                    return res.json({error: "Marca inválida"})
                }
                product.brand = newBrand
            }

            await product.save()
            return res.json({status: true})

        } else {
            return res.json({error: "Produto não encontrado"})
        }
    }

    res.json({error: "Não autorizado"})
}

export const deleteProduct = async (req: Request, res: Response) => {
    if(req.headers.authorization){
        const { idProduct } = req.query

        let product = await Product.findById(idProduct)

        if(product){
            await product.remove()
            return res.json({status: true})
        } else {
            return res.json({ error: "Produto não encontrado"})
        }
    }

    res.json({error: "Não autorizado"})
}

export const getProducts = async (req: Request, res: Response) => {
    let { sort = "asc", offset = 0, limit = 20, searchName, searchDescription, brand, category } = req.query
    let filters = {} as any
    let total = 0

    if(searchName){
        filters.name = {'$regex': searchName, '$options': 'i'}
    }

    if(searchDescription){
        filters.description = {'$regex': searchDescription, '$options': 'i'}
    }

    if(brand){
        filters.brand = brand
    }

    if(category){
        filters.category = category
    }

    const productsTotal = await Product.find(filters)
    total = productsTotal.length 

    const productsData = await Product.find(filters)
        .sort({ name: ( sort=='desc'?-1:1 ) })
        .skip(Number(offset))
        .limit(Number(limit))
    let products = []

    for( let i =0; i<productsData.length; i++){
        let fullCategory = await ProductCategory.findById(productsData[i].category)
        let fullBrand = await Brand.findById(productsData[i].brand)

        products.push({
            _id: productsData[i]._id,
            name: productsData[i].name,
            description: productsData[i].description,
            price: productsData[i].price,
            stock: productsData[i].stock,
            category: fullCategory,
            brand: fullBrand
        })
    }

    res.json({ products, total })
}