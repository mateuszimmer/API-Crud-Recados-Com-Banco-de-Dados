import { Request, Response } from "express";
import { IResposta } from "../../../shared/interfaces/IResposta";
import { UsuarioLogadoRepository } from "../repositories/usuarioLogado.repository";
import { ObterUsuarioLogadoPorIdUseCase } from "../usecases/obter-usuario-logado-por-id.usecase";
import { HttpHelper } from "../../../shared/util/http.helper";
import { ExcluirUsuarioLogadoUseCase } from "../usecases/excluir-usuario-logado.usecase";

export class UsuarioLogadoController {
    async getUserLoggedById (req: Request, res: Response) {
        try{
            const { token } = req.params;

            const usecase = new ObterUsuarioLogadoPorIdUseCase(new UsuarioLogadoRepository);
            const resposta =  await usecase.execute(token);

            if(!resposta) return HttpHelper.reqError(res, 'Não há usuario logado', 404);
            return HttpHelper.success(res, resposta, 'Autorizado', 200);

        } catch (error: any) {
            HttpHelper.serverError(res, error);
        };
    };

    async logoutUser (req: Request, res: Response) {
        try {
            const { token } = req.params;

            const usecase = new ExcluirUsuarioLogadoUseCase(new UsuarioLogadoRepository);
            const resposta  = await usecase.execute(token);

            if (!resposta) return HttpHelper.reqError(res, 'Não foi excluido nenhum usuario logado');
            return HttpHelper.success(res, null, 'Deslogado', 200);

        } catch (error: any) {
            HttpHelper.serverError(res, error);
        };
    };
};