import { Request, Response } from "express";
import { IRecado } from "../../../shared/interfaces/IRecado";
import { IResposta } from "../../../shared/interfaces/IResposta";
import { RecadoRepository } from "../repositories/recado.repository";
import { UsuarioLogadoRepository } from "../../usuario-logado/repositories/usuarioLogado.repository";
import { CriarRecadoUseCase } from "../usecases/create-recado.usecase";
import { HttpHelper } from "../../../shared/util/http.helper";
import { GetRecadoByIdUseCase } from "../usecases/get-recado-id.usecase";
import { GetRecadoByUserUseCase } from "../usecases/get-by-user.usercase";
import { UpdateRecadoUsecase } from "../usecases/update-recado-usecase";
import { UsuarioRepository } from "../../usuario/repositories/usuario.repository";
import { DeletarRecadoUseCase } from "../usecases/delete-recado.usecase";

export class RecadosController {
    async create(req: Request, res: Response) {
        try {
            const usecase = new CriarRecadoUseCase(new RecadoRepository())
            const novoRecado = await usecase.execute(req.body)
    
            return res.status(200).json(
                {
                    success: true,
                    message: 'Recado Cadastrado',
                    data: novoRecado
                } as IResposta
            )

        } catch (error: any) {
            HttpHelper.serverError(res, error)
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params

            const usecase = new GetRecadoByIdUseCase(new RecadoRepository())
            const result = await usecase.execute(id)

            HttpHelper.success(res, result, 'API - Recado Encontrado')

        } catch (error: any) {
            HttpHelper.serverError(res, error)
        }
    }

    async getByUser (req: Request, res: Response) {
        try {
            const arquivado = req.query.arquivado
            const titulo = req.query.titulo
            
            const tituloString = titulo?.toString()
            const arq = arquivado==="1"? true: false

            const usecase = new GetRecadoByUserUseCase(new RecadoRepository());
            const resposta = await usecase.execute(req.body['usuario'], tituloString, arq)

            return HttpHelper.success(res, resposta, 'API - Recados Localizados')
            
        } catch (error: any) {
            return HttpHelper.serverError(res, error)
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params

        const usecase = new UpdateRecadoUsecase(new RecadoRepository())
        const resposta = await usecase.execute(id, req.body)

        if(!resposta) {
            return HttpHelper.reqError(res, 'Não foi possível alterar o recado informado. Erro nas informações')
        }

        return HttpHelper.success(res, resposta, "Recado Alterado")
    }

    async delete(req: Request, res: Response) {
        const { usuario } = req.body
        const { recado } = req.query

        if(!recado) return ("ID do recado não informado")

        const usecase = new DeletarRecadoUseCase(new RecadoRepository())
        const resposta = await usecase.execute(recado.toString(), usuario)

        if(resposta?.affected === 0) return HttpHelper.reqError(res, 'Não foi possível deletar o recado')

        return HttpHelper.success(res, resposta, 'API -Recado excluído com sucesso')
    }
}