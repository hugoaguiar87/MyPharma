import { Request, Response } from "express";

export const pong = (req: Request, res: Response ) => {
    res.json({pong: "pingou"})
}