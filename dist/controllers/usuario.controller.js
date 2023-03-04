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
const usuarioLogado_repository_1 = require("../repositories/usuarioLogado.repository");
class UsuarioController {
    criate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, senha } = req.body;
            const repository = new usuario_repository_1.UsuarioRepository();
            const resposta = yield repository.create(email, senha);
            if (resposta) {
                return res.status(200).json({
                    success: true,
                    message: 'Usuário cadastrado',
                    data: {
                        email: resposta.email,
                        createdAt: resposta.createdAt
                    }
                });
            }
            return res.status(400).json({
                success: false,
                message: 'API - Não foi possível cadastrar usuário com as informações apresentadas',
                data: null
            });
        });
    }
    logarUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, senha } = req.body;
            const repository = new usuario_repository_1.UsuarioRepository();
            const resposta = yield repository.getByEmail(email, senha);
            if (resposta) {
                const repositoryLogado = new usuarioLogado_repository_1.UsuarioLogadoRepository();
                const token = (yield repositoryLogado.setLogado(email)).idTemporario;
                return res.status(200).json({
                    success: true,
                    message: 'API - Autorizado',
                    data: token
                });
            }
            return res.status(404).json({
                success: false,
                message: 'Não autorizado',
                data: null
            });
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { senha } = req.params;
            const repository = new usuario_repository_1.UsuarioRepository();
            const resposta = yield repository.getAll(senha);
            res.json(resposta);
        });
    }
}
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map