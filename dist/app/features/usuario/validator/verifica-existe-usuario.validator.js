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
exports.verificaExisteUsuario = void 0;
const http_helper_1 = require("../../../shared/util/http.helper");
const usuario_repository_1 = require("../repositories/usuario.repository");
const verificaExisteUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const repository = new usuario_repository_1.UsuarioRepository();
        const resposta = yield repository.findByEmail(email);
        if (resposta)
            return http_helper_1.HttpHelper.reqError(res, 'API - Usuario já cadastrado', 400);
        return next();
    }
    catch (error) {
        http_helper_1.HttpHelper.reqError(res, error);
    }
});
exports.verificaExisteUsuario = verificaExisteUsuario;
//# sourceMappingURL=verifica-existe-usuario.validator.js.map