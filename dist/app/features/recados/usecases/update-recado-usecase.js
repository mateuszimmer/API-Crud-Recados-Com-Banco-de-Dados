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
exports.UpdateRecadoUsecase = void 0;
class UpdateRecadoUsecase {
    constructor(_repository) {
        this._repository = _repository;
    }
    execute(id, recado) {
        return __awaiter(this, void 0, void 0, function* () {
            const recadoUpdate = yield this._repository.getById(id, recado.usuario);
            if (!recadoUpdate)
                return null;
            recadoUpdate.titulo = recado.titulo ? recado.titulo : recadoUpdate.titulo;
            recadoUpdate.descricao = recado.descricao ? recado.descricao : recadoUpdate.descricao;
            recadoUpdate.data = recado.data ? recado.data : recadoUpdate.data;
            recadoUpdate.arquivado = recado.arquivado ? recado.arquivado : recadoUpdate.arquivado;
            const resposta = yield this._repository.update(recadoUpdate);
            return resposta;
        });
    }
}
exports.UpdateRecadoUsecase = UpdateRecadoUsecase;
//# sourceMappingURL=update-recado-usecase.js.map