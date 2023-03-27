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
exports.CriarRecadoUseCase = void 0;
const recado_model_1 = require("../../../models/recado.model");
class CriarRecadoUseCase {
    constructor(_repository) {
        this._repository = _repository;
    }
    execute(recado) {
        return __awaiter(this, void 0, void 0, function* () {
            const novoRecado = recado_model_1.Recado.create(recado.titulo, recado.descricao, recado.data, recado.usuario);
            const result = yield this._repository.create(novoRecado);
            return this.toModelRecado(result);
        });
    }
    toModelRecado(recado) {
        return recado_model_1.Recado.create(recado.titulo, recado.descricao, recado.data, recado.usuario, recado.arquivado, recado.id);
    }
}
exports.CriarRecadoUseCase = CriarRecadoUseCase;
//# sourceMappingURL=create-recado.usecase.js.map