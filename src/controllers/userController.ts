import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { generateToken } from "../config/authConfig";

import User, { UserType } from "../models/User";

export const signup = async (req: Request, res: Response) => {
    if( req.body.name && req.body.email && req.body.password ) {
        let { name, email, password } = req.body

        if(!validator.isEmail(email)){
            return res.json({error: "Não é um email válido"})
        }

        let hashUser = await User.findOne({ email })
        if(hashUser){
            return res.json({error: "Email já cadastrado!"})
        }

        const passwordHash = await bcrypt.hash(password, 12)

        let newUser = await User.create({
            email,
            password: passwordHash,
            name
        })
        const token = generateToken({ _id: newUser._id, email: newUser.email })

        res.status(201)
        return res.json({id: newUser._id, email: newUser.email, token})
    }

    res.json({error: "Dados incompletos"})
}

export const signin = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password){
        let { email, password } = req.body

        if(!validator.isEmail(email)){
            return res.json({error: "Não é um email válido"})
        }

        let user = await User.findOne({ email })
        if(!user){
            return res.json({error: "Email não cadastrado!"})
        } else {
            const match = await bcrypt.compare(password, user.password)

            if(!match){
                return res.json({error: "Senha incorreta!"})
            } else {
                const token = generateToken({ _id: user._id, email: user.email })

                return res.json({status: true, token})
            }
        }
    }

    res.json({error: "Dados incompletos"})
}

export const getUserInfos = async (req: Request, res: Response) => {
    if(req.headers.authorization){
        const [type, token] = req.headers.authorization.split(" ")
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET as string) as any

        const user = await User.findById(tokenDecoded._id)

        return res.json({user})
    }

    res.json({error: "Não autorizado"})
}

export const editUser = async (req: Request, res: Response) => {
    if(req.headers.authorization){
        const [type, token] = req.headers.authorization.split(" ")
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
        let user = await User.findById(tokenDecoded._id)
        const {name, email, password} = req.body

        if(user){
            if(name){
                user.name = name
            }

            if(email && !validator.isEmail(email)){
                return res.json({error: "Email inválido!"})
            }

            if(email && validator.isEmail(email)){
                let emailExist = await User.findOne({ email })
                if(emailExist){ 
                    return res.json({ error: "Email já cadastrado" }) 
                }

                user.email = email
            }

            if(password){
                let passwordHash = await bcrypt.hash(password, 12)
                user.password = passwordHash
            }

            if(!name && !email && !password){
                return res.json({message: "Nenhum dado enviado"})
            }

            await user.save()

            return res.json({status: true})
        }
    }

    res.json({error: "Não autorizado"})
}