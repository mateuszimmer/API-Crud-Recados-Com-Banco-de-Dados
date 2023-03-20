import { Request, Response } from "express";
import { IRecado } from "../../../shared/interfaces/IRecado";
import { IResposta } from "../../../shared/interfaces/IResposta";
import { RecadoRepository } from "../repositories/recado.repository";
import { UsuarioLogadoRepository } from "../../usuario-logado/repositories/usuarioLogado.repository";
import { CriarRecadoUseCase } from "../usecases/create-recado.usecase";
import { HttpHelper } from "../../../shared/util/http.helper";
import { GetRecadoByIdUseCase } from "../usecases/get-recado-id.usecase";

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

    async getByUser(req: Request, res: Response) {
        const { token } = req.params
        const arquivado = req.query.arquivado
        const titulo = req.query.titulo
        
        const tituloString = titulo?.toString()

        const arq = arquivado==="1"? true: false

        
        const repLogado = new UsuarioLogadoRepository()
        const emailLogado = await repLogado.usuarioLogado(token)

        if (!emailLogado) return res.status(401).json(
            {
                success: false,
                message: "Usuario não logado",
                data: null
            } as IResposta
        )

        const repository = new RecadoRepository();

        const resposta = await repository.getByUser(emailLogado, arq, tituloString)

        const repostaMapeada = resposta.map(recado => {
            const novadata = new Date(recado.data)
            return({
                id: recado.id,
                titulo: recado.titulo,
                data: novadata.toISOString().slice(0, 10),
                usuario: token,
                descricao: recado.descricao,
                arquivado: recado.arquivado,
                createdAt: recado.createdAt,
                updatedAt: recado.updatedAt
            } as IRecado)
        })

        return res.json({   
            success: true,
            message: 'Recados',
            data: repostaMapeada
        })
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const { titulo, descricao, data, token, arquivado } = req.body


        if(!titulo || !descricao || !data || !token ) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Todas as informações devem ser preenchidas',
                    data: null
                } as IResposta
            )}
            
        const repLogado = new UsuarioLogadoRepository()
        const emailLogado = await repLogado.usuarioLogado(token)
        
        if (!emailLogado) return res.status(401).json(
            {
                success: false,
                message: "Usuario não logado",
                data: null
            } as IResposta
        )

        const repository = new RecadoRepository()
        const novoRecado = await repository.update(id, titulo, descricao, data, emailLogado, arquivado)

        if(!novoRecado) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Não foi possível alterar o recado informado. Erro nas informações',
                    data: null
                } as IResposta
            )
        }

        return res.status(200).json(
            {
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
            } as IResposta
        )
    }

    async delete(req: Request, res: Response) {
        const { token } = req.params
        const { recado } = req.query

        const repLogado = new UsuarioLogadoRepository()
        const emailLogado = await repLogado.usuarioLogado(token)

        if (!emailLogado) return res.status(401).json(
            {
                success: false,
                message: "Usuario não logado",
                data: null
            } as IResposta
        )

        if(!recado) return ("ID do recado não informado")
        
        const repository = new RecadoRepository()
    
        const recadoEncontrado = await repository.getById(recado.toString(), emailLogado)

        if(!recadoEncontrado) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Recado não encontrado para o Usuário Logado",
                    data: null
                } as IResposta
            )
        }
        
        const resposta = await repository.delete(recado.toString(), emailLogado)

        return res.status(200).json(
            {
                success: true,
                message: "Recado excluído",
                data: {
                    recadoExcluido: recadoEncontrado
                }
            } as IResposta
        )
    }
}