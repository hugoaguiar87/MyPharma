import { Request, Response } from "express";

export const pong = async(req: Request, res: Response ) => {
    res.json({pong: "pingou"})
}