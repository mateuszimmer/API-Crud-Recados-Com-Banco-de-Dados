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
exports.LogarUsuario = void 0;
const usuarioLogado_repository_1 = require("../../usuario-logado/repositories/usuarioLogado.repository");
const criar_usuario_logado_usecase_1 = require("../../usuario-logado/usecases/criar-usuario-logado.usecase");
class LogarUsuario {
    constructor(_repository) {
        this._repository = _repository;
    }
    execute(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const resposta = yield this._repository.getByEmail(usuario.email, usuario.senha);
            console.log(resposta);
            if (resposta) {
                const token = yield new criar_usuario_logado_usecase_1.CriaUsuarioLogadoUseCase(new usuarioLogado_repository_1.UsuarioLogadoRepository()).setNovoUsuarioLogado(resposta);
                return token;
            }
            return null;
        });
    }
}
exports.LogarUsuario = LogarUsuario;
//# sourceMappingURL=login.usecase.js.map