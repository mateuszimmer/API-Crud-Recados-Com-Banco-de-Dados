import { Request, Response } from "express";
import { UsuarioRepository } from "../repositories/usuario.repository";
import { CreateUsuarioUseCase } from "../usecases/create-usuario.usecase";
import { HttpHelper } from "../../../shared/util/http.helper";
import { LogarUsuario } from "../usecases/login.usecase";
import { ListarUsuariosUseCase } from "../usecases/listar-usuario.usecase";

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

            if (!resultado) return HttpHelper.reqError(res, 'Usuario não encontrado', 404)

            HttpHelper.success(res, resultado, 'API - Autorizado', 202)

        } catch (error: any) {
            HttpHelper.serverError(res, error)
        }
    }

    async getAll(req: Request, res: Response) {
        try{
            const { senha } = req.params

            const usecase = new ListarUsuariosUseCase(new UsuarioRepository())
            const resposta = await usecase.list(senha)

            res.json(resposta)
        } catch (error: any) {
            HttpHelper.serverError(res, error)
        }
    }
}