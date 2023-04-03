import express from 'express'
import cors from 'cors'
import { makeRoutes } from '../server/express.routes'

export const createServer = () => {
    const app = express();

    app.use(cors());

    app.use(express.json())

    makeRoutes(app)

    return app
}