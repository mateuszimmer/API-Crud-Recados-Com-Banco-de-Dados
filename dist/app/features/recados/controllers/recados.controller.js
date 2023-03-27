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
const create_recado_usecase_1 = require("../usecases/create-recado.usecase");
const http_helper_1 = require("../../../shared/util/http.helper");
const get_recado_id_usecase_1 = require("../usecases/get-recado-id.usecase");
const get_by_user_usercase_1 = require("../usecases/get-by-user.usercase");
const update_recado_usecase_1 = require("../usecases/update-recado-usecase");
const delete_recado_usecase_1 = require("../usecases/delete-recado.usecase");
class RecadosController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usecase = new create_recado_usecase_1.CriarRecadoUseCase(new recado_repository_1.RecadoRepository());
                const novoRecado = yield usecase.execute(req.body);
                return res.status(200).json({
                    success: true,
                    message: 'Recado Cadastrado',
                    data: novoRecado
                });
            }
            catch (error) {
                http_helper_1.HttpHelper.serverError(res, error);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const usecase = new get_recado_id_usecase_1.GetRecadoByIdUseCase(new recado_repository_1.RecadoRepository());
                const result = yield usecase.execute(id);
                http_helper_1.HttpHelper.success(res, result, 'API - Recado Encontrado');
            }
            catch (error) {
                http_helper_1.HttpHelper.serverError(res, error);
            }
        });
    }
    getByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const arquivado = req.query.arquivado;
                const titulo = req.query.titulo;
                const tituloString = titulo === null || titulo === void 0 ? void 0 : titulo.toString();
                const arq = arquivado === "1" ? true : false;
                const usecase = new get_by_user_usercase_1.GetRecadoByUserUseCase(new recado_repository_1.RecadoRepository());
                const resposta = yield usecase.execute(req.body['usuario'], tituloString, arq);
                return http_helper_1.HttpHelper.success(res, resposta, 'API - Recados Localizados');
            }
            catch (error) {
                return http_helper_1.HttpHelper.serverError(res, error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usecase = new update_recado_usecase_1.UpdateRecadoUsecase(new recado_repository_1.RecadoRepository());
            const resposta = yield usecase.execute(id, req.body);
            if (!resposta) {
                return http_helper_1.HttpHelper.reqError(res, 'Não foi possível alterar o recado informado. Erro nas informações');
            }
            return http_helper_1.HttpHelper.success(res, resposta, "Recado Alterado");
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario } = req.body;
            const { recado } = req.query;
            if (!recado)
                return ("ID do recado não informado");
            const usecase = new delete_recado_usecase_1.DeletarRecadoUseCase(new recado_repository_1.RecadoRepository());
            const resposta = yield usecase.execute(recado.toString(), usuario);
            if ((resposta === null || resposta === void 0 ? void 0 : resposta.affected) === 0)
                return http_helper_1.HttpHelper.reqError(res, 'Não foi possível deletar o recado');
            return http_helper_1.HttpHelper.success(res, resposta, 'API -Recado excluído com sucesso');
        });
    }
}
exports.RecadosController = RecadosController;
//# sourceMappingURL=recados.controller.js.map