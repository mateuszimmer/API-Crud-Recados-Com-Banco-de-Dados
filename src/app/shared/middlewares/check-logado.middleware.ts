import { NextFunction, Request, Response } from "express";
import { UsuarioLogadoRepository } from "../../features/usuario-logado/repositories/usuarioLogado.repository";
import { HttpHelper } from "../util/http.helper";

export const checkLogado = async (req: Request, res: Response, next: NextFunction) => {
    let { usuario } = req.body

    if(!usuario){
        const { token } = req.params
        usuario = token
    }

    if(!usuario) return HttpHelper.reqError(res, 'API - Não foi possível identificar usuário logado.')

    const repLogado = new UsuarioLogadoRepository()
    const emailLogado = await repLogado.usuarioLogado(usuario)
    
    if(!emailLogado) return HttpHelper.reqError(res, 'API - Usuário não Logado. Realize o login para continuar.')

    req.body['usuario'] = emailLogado

    return next()
}