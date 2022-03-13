import express, { Request, Response, ErrorRequestHandler } from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

import mainRoutes from "./routes/route";

dotenv.config()

const server = express()

server.use(cors())

server.use(express.static(path.join(__dirname, '../public')))
server.use(express.urlencoded({ extended: true }))

server.use('/api', mainRoutes)

server.use((req: Request, res: Response) => {
    res.status(404)
    res.json({error: 'Endpoint não encontrado'})
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(err.status){
        res.status(err.status)
    } else {
        res.status(404)
    }

    if(err.message){
        res.json({error: err.message})
    } else {
        res.json({error: 'Ocorreu algum erro na requisição!'})
    }
}

server.use(errorHandler)

server.listen(process.env.PORT)