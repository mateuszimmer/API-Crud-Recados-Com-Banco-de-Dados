import express from 'express'
import appRoutes from './routes'
import cors from 'cors'
import { pgHelper } from './database/pg-helper';

const api = express()

api.use(express.json(), cors())

appRoutes(api)

pgHelper
    .connect()
    .then(() => {
        api.listen(process.env.PORT || 8080, () => console.log('API Rodando'))
    })