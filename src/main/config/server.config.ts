import express from 'express'
import { makeRoutes } from '../server/express.routes'
import cors from 'cors'

export const createServer = () => {
    const app = express();

    app.use(cors());

    app.use(express.json())

    makeRoutes(app)

    return app
}