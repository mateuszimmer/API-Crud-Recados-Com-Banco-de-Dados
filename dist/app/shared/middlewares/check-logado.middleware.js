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
exports.checkLogado = void 0;
const usuarioLogado_repository_1 = require("../../features/usuario-logado/repositories/usuarioLogado.repository");
const http_helper_1 = require("../util/http.helper");
const checkLogado = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { usuario } = req.body;
    if (!usuario) {
        const { token } = req.params;
        usuario = token;
    }
    const repLogado = new usuarioLogado_repository_1.UsuarioLogadoRepository();
    const emailLogado = yield repLogado.usuarioLogado(usuario);
    if (!emailLogado)
        return http_helper_1.HttpHelper.reqError(res, 'API - Usuário não Logado. Realize o login para continuar.');
    req.body['usuario'] = emailLogado;
    return next();
});
exports.checkLogado = checkLogado;
//# sourceMappingURL=check-logado.middleware.js.map