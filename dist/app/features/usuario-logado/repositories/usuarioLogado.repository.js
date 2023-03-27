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
exports.UsuarioLogadoRepository = void 0;
const usuarioLogado_entity_1 = require("../../../shared/entities/usuarioLogado.entity");
const uuid_1 = require("uuid");
class UsuarioLogadoRepository {
    setLogado(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const novoRegistro = usuarioLogado_entity_1.UsuarioLogadoEntity.create({
                usuario: email,
                idTemporario: (0, uuid_1.v4)(),
            });
            const resposta = yield novoRegistro.save();
            return resposta;
        });
    }
    usuarioLogado(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resposta = yield usuarioLogado_entity_1.UsuarioLogadoEntity.findOne({
                where: {
                    idTemporario: id
                }
            });
            if (!resposta)
                return null;
            return resposta.usuario;
        });
    }
    deleteLogado(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const chave = yield usuarioLogado_entity_1.UsuarioLogadoEntity.findOne({
                where: {
                    idTemporario: id
                }
            });
            if (chave) {
                const resposta = yield usuarioLogado_entity_1.UsuarioLogadoEntity.delete(chave.usuario);
                return resposta;
            }
            return null;
        });
    }
}
exports.UsuarioLogadoRepository = UsuarioLogadoRepository;
//# sourceMappingURL=usuarioLogado.repository.js.map