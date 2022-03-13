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
        const token = generateToken({ id: newUser._id, email: newUser.email })

        res.status(201)
        return res.json({id: newUser._id, email: newUser.email, token})
    }

    res.json({error: "Dados incompletos"})
}