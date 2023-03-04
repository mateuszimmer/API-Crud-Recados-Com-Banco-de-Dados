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
const usuario_entity_1 = require("../database/entities/usuario.entity");
class UsuarioRepository {
    create(email, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield usuario_entity_1.UsuarioEntity.findOne({
                where: {
                    email
                }
            });
            if (existe)
                return (null);
            const novoUsuario = usuario_entity_1.UsuarioEntity.create({
                email,
                senha
            });
            const usuarioSalvo = yield novoUsuario.save();
            return (usuarioSalvo);
        });
    }
    getByEmail(email, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield usuario_entity_1.UsuarioEntity.findOne({
                where: {
                    email, senha
                }
            });
            return existe;
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