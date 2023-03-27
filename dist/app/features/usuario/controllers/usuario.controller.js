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
exports.UsuarioController = void 0;
const usuario_repository_1 = require("../repositories/usuario.repository");
const create_usuario_usecase_1 = require("../usecases/create-usuario.usecase");
const http_helper_1 = require("../../../shared/util/http.helper");
const login_usecase_1 = require("../usecases/login.usecase");
const listar_usuario_usecase_1 = require("../usecases/listar-usuario.usecase");
class UsuarioController {
    criate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usecase = new create_usuario_usecase_1.CreateUsuarioUseCase(new usuario_repository_1.UsuarioRepository());
                const resultado = yield usecase.execute(req.body);
                http_helper_1.HttpHelper.success(res, resultado, 'API - Usuario cadastrado com Sucesso!');
            }
            catch (error) {
                http_helper_1.HttpHelper.reqError(res, error);
            }
        });
    }
    logarUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usecase = new login_usecase_1.LogarUsuario(new usuario_repository_1.UsuarioRepository());
                const resultado = yield usecase.execute(req.body);
                if (!resultado)
                    return http_helper_1.HttpHelper.reqError(res, 'Usuario não encontrado', 404);
                http_helper_1.HttpHelper.success(res, resultado, 'API - Autorizado', 202);
            }
            catch (error) {
                http_helper_1.HttpHelper.serverError(res, error);
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { senha } = req.params;
            const usecase = new listar_usuario_usecase_1.ListarUsuariosUseCase(new usuario_repository_1.UsuarioRepository());
            const resposta = yield usecase.list(senha);
            res.json(resposta);
        });
    }
}
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map