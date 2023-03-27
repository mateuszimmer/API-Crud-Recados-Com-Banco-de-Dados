"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recado = void 0;
const uuid_1 = require("uuid");
class Recado {
    constructor(titulo, descricao, data, usuario, arquivado, id) {
        this.id = id !== null && id !== void 0 ? id : (0, uuid_1.v4)();
        this.titulo = titulo;
        this.descricao = descricao;
        this.data = data;
        this.usuario = usuario;
        this.arquivado = arquivado !== null && arquivado !== void 0 ? arquivado : false;
    }
    static create(titulo, descricao, data, usuario, arquivado, id) {
        return new Recado(titulo, descricao, data, usuario, arquivado, id);
    }
}
exports.Recado = Recado;
//# sourceMappingURL=recado.model.js.map