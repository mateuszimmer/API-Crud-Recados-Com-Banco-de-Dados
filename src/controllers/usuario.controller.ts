import { Request, Response } from "express";
import { IResposta } from "../interfaces/IResposta";
import { UsuarioRepository } from "../repositories/usuario.repository";
import { UsuarioLogadoRepository } from "../repositories/usuarioLogado.repository";

export class UsuarioController {

    async criate(req: Request, res: Response) {
        const { email, senha } = req.body

        const repository = new UsuarioRepository()

        const resposta = await repository.create(email, senha)

        if (resposta){
            return res.status(200).json(
                {
                    success: true,
                    message: 'Usuário cadastrado',
                    data: {
                        email: resposta.email,
                        createdAt: resposta.createdAt
                    }
                } as IResposta
            )
        }

        return res.status(400).json(
            {
                success: false,
                message: 'API - Não foi possível cadastrar usuário com as informações apresentadas',
                data: null
            } as IResposta
        )
    }

    async logarUser(req: Request, res: Response) {
        const { email, senha } = req.body

        const repository = new UsuarioRepository();
        const resposta = await repository.getByEmail(email, senha)
        
        if (resposta){
            const repositoryLogado = new UsuarioLogadoRepository();
            const token = (await repositoryLogado.setLogado(email)).idTemporario

            return res.status(200).json(
                {
                    success: true,
                    message: 'API - Autorizado',
                    data: token
                } as IResposta
            )
        }

        return res.status(404).json(
            {
                success: false,
                message: 'Não autorizado',
                data: null
            } as IResposta
        )
    }

    async getAll(req: Request, res: Response) {
        const { senha } = req.params

        const repository = new UsuarioRepository();

        const resposta = await repository.getAll(senha)

        res.json(resposta)
    }
}