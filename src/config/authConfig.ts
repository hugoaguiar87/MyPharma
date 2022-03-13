import passport from "passport";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config()

export const generateToken = (data: object) => {
    return jwt.sign(data, process.env.JWT_SECRET as string)
}