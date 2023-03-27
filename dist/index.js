"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_connections_1 = require("./main/database/typeorm.connections");
const express_server_1 = require("./main/server/express.server");
Promise.all([typeorm_connections_1.DatabaseConnection.connect()])
    .then(express_server_1.runServer)
    .catch((error) => {
    console.log('Erro ao iniciar');
    console.log(error);
});
//# sourceMappingURL=index.js.map