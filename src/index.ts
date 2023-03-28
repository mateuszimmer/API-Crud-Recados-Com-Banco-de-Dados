import { RedisConnection } from "./main/database/redis.connection";
import { DatabaseConnection } from "./main/database/typeorm.connections";
import { runServer } from "./main/server/express.server";

Promise.all([DatabaseConnection.connect(), RedisConnection.connect()])
    .then(runServer)
    .catch((error: any) => {
        console.log('Erro ao iniciar');
        console.log(error);
    })