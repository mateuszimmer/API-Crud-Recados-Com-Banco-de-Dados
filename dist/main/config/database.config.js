"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_env_1 = require("../../app/envs/typeorm.env");
const typeorm_1 = require("typeorm");
const recado_entity_1 = require("../../app/shared/entities/recado.entity");
const usuario_entity_1 = require("../../app/shared/entities/usuario.entity");
const usuarioLogado_entity_1 = require("../../app/shared/entities/usuarioLogado.entity");
const _1677495888053_CreateTableUsuario_1 = require("../../app/shared/migrations/1677495888053-CreateTableUsuario");
const _1677508413621_CreateTableRecados_1 = require("../../app/shared/migrations/1677508413621-CreateTableRecados");
const _1677510544482_CreateTableUsuariosLogados_1 = require("../../app/shared/migrations/1677510544482-CreateTableUsuariosLogados");
exports.default = new typeorm_1.DataSource({
    type: "postgres",
    url: typeorm_env_1.typeormEnv.url,
    synchronize: false,
    logging: false,
    entities: [
        recado_entity_1.RecadoEntity,
        usuario_entity_1.UsuarioEntity,
        usuarioLogado_entity_1.UsuarioLogadoEntity
    ],
    migrations: [
        _1677508413621_CreateTableRecados_1.CreateTableRecados1677508413621,
        _1677495888053_CreateTableUsuario_1.CreateTableUsuario1677495888053,
        _1677510544482_CreateTableUsuariosLogados_1.CreateTableUsuariosLogados1677510544482
    ],
});
//# sourceMappingURL=database.config.js.map