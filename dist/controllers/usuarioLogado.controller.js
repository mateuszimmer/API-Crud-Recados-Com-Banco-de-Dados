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
exports.UsuarioLogadoController = void 0;
const usuarioLogado_repository_1 = require("../repositories/usuarioLogado.repository");
class UsuarioLogadoController {
    getUserLoggedById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            const repository = new usuarioLogado_repository_1.UsuarioLogadoRepository();
            const resposta = yield repository.usuarioLogado(token);
            if (!resposta)
                return res.status(404).json({
                    success: false,
                    message: 'Não há usuario logado',
                    data: null
                });
            return res.status(200).json({
                success: true,
                message: 'Autorizado',
                data: token
            });
        });
    }
    logoutUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            const repository = new usuarioLogado_repository_1.UsuarioLogadoRepository();
            yield repository.deleteLogado(token);
            return res.status(200).json({
                success: true,
                message: 'Deslogado',
                data: null
            });
        });
    }
}
exports.UsuarioLogadoController = UsuarioLogadoController;
//# sourceMappingURL=usuarioLogado.controller.js.map