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
exports.RecadosController = void 0;
const recado_repository_1 = require("../repositories/recado.repository");
const usuarioLogado_repository_1 = require("../repositories/usuarioLogado.repository");
class RecadosController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { titulo, descricao, data, usuario } = req.body;
            if (!titulo || !descricao || !data || !usuario) {
                return res.status(400).json({
                    success: false,
                    message: 'Todas as informações devem ser preenchidas',
                    data: null
                });
            }
            const repLogado = new usuarioLogado_repository_1.UsuarioLogadoRepository();
            const emailLogado = yield repLogado.usuarioLogado(usuario);
            if (!emailLogado)
                return res.status(401).json({
                    success: false,
                    message: "Usuario não logado",
                    data: null
                });
            const repository = new recado_repository_1.RecadoRepository();
            const novoRecado = yield repository.create(titulo, descricao, data, emailLogado);
            return res.status(200).json({
                success: true,
                message: 'Recado Cadastrado',
                data: novoRecado
            });
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const repository = new recado_repository_1.RecadoRepository();
            const resposta = yield repository.getById(id);
            return res.json(resposta);
        });
    }
    getByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            const arquivado = req.query.arquivado;
            const titulo = req.query.titulo;
            const tituloString = titulo === null || titulo === void 0 ? void 0 : titulo.toString();
            const arq = arquivado === "1" ? true : false;
            const repLogado = new usuarioLogado_repository_1.UsuarioLogadoRepository();
            const emailLogado = yield repLogado.usuarioLogado(token);
            if (!emailLogado)
                return res.status(401).json({
                    success: false,
                    message: "Usuario não logado",
                    data: null
                });
            const repository = new recado_repository_1.RecadoRepository();
            const resposta = yield repository.getByUser(emailLogado, arq, tituloString);
            const repostaMapeada = resposta.map(recado => {
                const novadata = new Date(recado.data);
                return {
                    id: recado.id,
                    titulo: recado.titulo,
                    data: novadata.toISOString().slice(0, 10),
                    usuario: token,
                    descricao: recado.descricao,
                    arquivado: recado.arquivado,
                    createdAt: recado.createdAt,
                    updatedAt: recado.updatedAt
                };
            });
            return res.json({
                success: true,
                message: 'Recados',
                data: repostaMapeada
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { titulo, descricao, data, token, arquivado } = req.body;
            if (!titulo || !descricao || !data || !token) {
                return res.status(400).json({
                    success: false,
                    message: 'Todas as informações devem ser preenchidas',
                    data: null
                });
            }
            const repLogado = new usuarioLogado_repository_1.UsuarioLogadoRepository();
            const emailLogado = yield repLogado.usuarioLogado(token);
            if (!emailLogado)
                return res.status(401).json({
                    success: false,
                    message: "Usuario não logado",
                    data: null
                });
            const repository = new recado_repository_1.RecadoRepository();
            const novoRecado = yield repository.update(id, titulo, descricao, data, emailLogado, arquivado);
            if (!novoRecado) {
                return res.status(400).json({
                    success: false,
                    message: 'Não foi possível alterar o recado informado. Erro nas informações',
                    data: null
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Recado Cadastrado',
                data: {
                    id: novoRecado.id,
                    titulo: novoRecado.titulo,
                    descricao: novoRecado.descricao,
                    data: novoRecado.data,
                    arquivado: novoRecado.arquivado,
                    createdAt: novoRecado.createdAt,
                    updatedAt: novoRecado.updatedAt
                }
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            const { recado } = req.query;
            const repLogado = new usuarioLogado_repository_1.UsuarioLogadoRepository();
            const emailLogado = yield repLogado.usuarioLogado(token);
            if (!emailLogado)
                return res.status(401).json({
                    success: false,
                    message: "Usuario não logado",
                    data: null
                });
            if (!recado)
                return ("ID do recado não informado");
            const repository = new recado_repository_1.RecadoRepository();
            const recadoEncontrado = yield repository.getById(recado.toString(), emailLogado);
            if (!recadoEncontrado) {
                return res.status(400).json({
                    success: false,
                    message: "Recado não encontrado para o Usuário Logado",
                    data: null
                });
            }
            const resposta = yield repository.delete(recado.toString(), emailLogado);
            return res.status(200).json({
                success: true,
                message: "Recado excluído",
                data: {
                    recadoExcluido: recadoEncontrado
                }
            });
        });
    }
}
exports.RecadosController = RecadosController;
//# sourceMappingURL=recados.controller.js.map