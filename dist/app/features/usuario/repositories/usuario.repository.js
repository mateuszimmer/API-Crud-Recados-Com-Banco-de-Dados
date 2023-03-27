"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const typeorm_connections_1 = require("../../../../main/database/typeorm.connections");
const usuario_model_1 = require("../../../models/usuario.model");
const usuario_entity_1 = require("../../../shared/entities/usuario.entity");
class UsuarioRepository {
    constructor() {
        this._repository = typeorm_connections_1.DatabaseConnection.connection.getRepository(usuario_entity_1.UsuarioEntity);
    }
    create(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioSalvo = yield this._repository.save(usuario);
            const resposta = this.toModelUsuario(usuarioSalvo);
            return resposta;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const search = yield this._repository.findOne({
                where: {
                    email
                }
            });
            return search;
        });
    }
    toModelUsuario(user) {
        return usuario_model_1.Usuario.criate(user.email, user.senha);
    }
    getByEmail(email, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            const search = yield usuario_entity_1.UsuarioEntity.findOne({
                where: {
                    email, senha
                }
            });
            if (!search)
                return null;
            return this.toModelUsuario(search);
        });
    }
    getAll(senha) {
        return __awaiter(this, void 0, void 0, function* () {
            if (senha !== 'MateusZimmer')
                return null;
            const resposta = yield usuario_entity_1.UsuarioEntity.find();
            return resposta;
        });
    }
}
exports.UsuarioRepository = UsuarioRepository;
//# sourceMappingURL=usuario.repository.js.map