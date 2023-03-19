import { Request, Response } from "express";
import { IResposta } from "../../../shared/interfaces/IResposta";
import { UsuarioRepository } from "../repositories/usuario.repository";
import { UsuarioLogadoRepository } from "../../usuario-logado/repositories/usuarioLogado.repository";
import { CreateUsuarioUseCase } from "../usecases/create-usuario.usecase";
import { HttpHelper } from "../../../shared/util/http.helper";
import { LogarUsuario } from "../usecases/login.usecase";

export class UsuarioController {

    async criate(req: Request, res: Response) {
        try {
            const usecase = new CreateUsuarioUseCase(new UsuarioRepository());
            const resultado = await usecase.execute(req.body);

            HttpHelper.success(res, resultado, 'API - Usuario cadastrado com Sucesso!')

        } catch (error: any) {
            HttpHelper.reqError(res, error)
        }
    }

    async logarUser(req: Request, res: Response) {
        try {
            const usecase = new LogarUsuario(new UsuarioRepository());
            const resultado = await usecase.execute(req.body)

        } catch (error: any) {

        }
    }

    async getAll(req: Request, res: Response) {
        const { senha } = req.params

        const repository = new UsuarioRepository();

        const resposta = await repository.getAll(senha)

        res.json(resposta)
    }
}