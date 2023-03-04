"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const recado_entity_1 = require("./entities/recado.entity");
const usuario_entity_1 = require("./entities/usuario.entity");
const usuarioLogado_entity_1 = require("./entities/usuarioLogado.entity");
const _1677495888053_CreateTableUsuario_1 = require("./migrations/1677495888053-CreateTableUsuario");
const _1677508413621_CreateTableRecados_1 = require("./migrations/1677508413621-CreateTableRecados");
const _1677510544482_CreateTableUsuariosLogados_1 = require("./migrations/1677510544482-CreateTableUsuariosLogados");
const config = {
    type: "postgres",
    // url: process.env.DATABASE_URL,
    url: 'postgres://masxnkum:5QJqpva37MgUxyrCFO2qUMjgkL1IruTO@babar.db.elephantsql.com/masxnkum',
    synchronize: false,
    logging: false,
    entities: [recado_entity_1.RecadoEntity, usuario_entity_1.UsuarioEntity, usuarioLogado_entity_1.UsuarioLogadoEntity],
    migrations: [_1677508413621_CreateTableRecados_1.CreateTableRecados1677508413621, _1677495888053_CreateTableUsuario_1.CreateTableUsuario1677495888053, _1677510544482_CreateTableUsuariosLogados_1.CreateTableUsuariosLogados1677510544482],
    // ssl: {
    //   rejectUnauthorized: false,
    // },
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map