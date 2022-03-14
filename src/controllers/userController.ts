import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";

import { generateToken } from "../config/authConfig";

import User from "../models/User";

export const singup = async (req: Request, res: Response) => {
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

export const singin = async (req: Request, res: Response) => {
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