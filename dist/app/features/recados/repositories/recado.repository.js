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
exports.RecadoRepository = void 0;
const typeorm_1 = require("typeorm");
const recado_entity_1 = require("../../../shared/entities/recado.entity");
class RecadoRepository {
    create(recado) {
        return __awaiter(this, void 0, void 0, function* () {
            const novoRecado = recado_entity_1.RecadoEntity.create({
                titulo: recado.titulo,
                descricao: recado.descricao,
                data: recado.data,
                usuario: recado.usuario
            });
            const resposta = yield novoRecado.save();
            return resposta;
        });
    }
    getById(id, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const pesquisa = yield recado_entity_1.RecadoEntity.findOne({
                where: {
                    id,
                    usuario
                }
            });
            return pesquisa;
        });
    }
    getByUser(email, arquivado, titulo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (titulo) {
                const recados = yield recado_entity_1.RecadoEntity.find({
                    where: {
                        usuario: email,
                        titulo: (0, typeorm_1.ILike)(`%${titulo}%`),
                        arquivado: (arquivado ? true : false)
                    }
                });
                return recados;
            }
            else {
                const recados = yield recado_entity_1.RecadoEntity.find({
                    where: {
                        usuario: email,
                        arquivado: arquivado ? true : false,
                    }
                });
                return recados;
            }
        });
    }
    update(novoRecado) {
        return __awaiter(this, void 0, void 0, function* () {
            const recado = yield this.getById(novoRecado.id, novoRecado.usuario);
            if (!recado)
                return null;
            recado.titulo = novoRecado.titulo ? novoRecado.titulo : recado.titulo;
            recado.descricao = novoRecado.descricao ? novoRecado.descricao : recado.descricao;
            recado.data = novoRecado.data ? novoRecado.data : recado.data;
            recado.arquivado = novoRecado.arquivado ? novoRecado.arquivado : recado.arquivado;
            const retorno = yield recado.save();
            return retorno;
        });
    }
    delete(id, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("id: ", id);
            console.log("usuario: ", usuario);
            const retorno = yield recado_entity_1.RecadoEntity.delete({
                id,
                usuario
            });
            return retorno;
        });
    }
}
exports.RecadoRepository = RecadoRepository;
//# sourceMappingURL=recado.repository.js.map