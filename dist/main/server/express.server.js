"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runServer = void 0;
const server_config_1 = require("../config/server.config");
require("dotenv/config");
const app_env_1 = require("../../app/envs/app.env");
const runServer = () => {
    const app = (0, server_config_1.createServer)();
    app.listen(app_env_1.appEnv.port, () => {
        console.log('Servidor rodando na porta', app_env_1.appEnv.port);
    });
};
exports.runServer = runServer;
//# sourceMappingURL=express.server.js.map