import { createServer } from "../config/server.config";
import 'dotenv/config';
import { appEnv } from "../../app/envs/app.env";

export const runServer = () => {
    const app = createServer();

    app.listen(appEnv.port, () => {
        console.log('Servidor rodando na porta', appEnv.port)
    })
}