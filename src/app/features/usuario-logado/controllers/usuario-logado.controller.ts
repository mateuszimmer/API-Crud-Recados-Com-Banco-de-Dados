import { Request, Response } from "express";
import { IResposta } from "../../../shared/interfaces/IResposta";
import { UsuarioLogadoRepository } from "../repositories/usuarioLogado.repository";

export class UsuarioLogadoController {
    async getUserLoggedById (req: Request, res: Response) {
        const { token } = req.params

        const repository = new UsuarioLogadoRepository();

        const resposta =  await repository.usuarioLogado(token)

        if(!resposta) return res.status(404).json({
            success: false,
            message: 'Não há usuario logado',
            data: null
        } as IResposta)

        return res.status(200).json({
            success: true,
            message: 'Autorizado',
            data: token
        } as IResposta)

    }

    async logoutUser (req: Request, res: Response) {
        const { token } = req.params

        const repository = new UsuarioLogadoRepository();

        await repository.deleteLogado(token)

        return res.status(200).json({
            success: true,
            message: 'Deslogado',
            data: null
        } as IResposta)
    }
}