import { Request, Response, NextFunction } from "express";
import passport from "passport";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/User";

dotenv.config()

const notAuthorizedJson = { status: 401, message: "Não Autorizado" }
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}

passport.use(new JWTStrategy(options, async (payload, done) => {
    const user = await User.findById(payload._id)
    return ( user ? done(null, user) : done(notAuthorizedJson, false) )
}))

export const generateToken = (data: object) => {
    return jwt.sign(data, process.env.JWT_SECRET as string)
}

export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
    const authFunction = passport.authenticate('jwt', (err, user) => {
        return user ? next() : next(notAuthorizedJson)
    })
    authFunction(req, res, next)
}

export default passport;