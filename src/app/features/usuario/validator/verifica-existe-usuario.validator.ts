import { NextFunction, Request, Response } from "express";
import { HttpHelper } from "../../../shared/util/http.helper";
import { UsuarioRepository } from "../repositories/usuario.repository";


export const verificaExisteUsuario = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body
        const repository = new UsuarioRepository()
        const resposta = await repository.findByEmail(email)

        if(resposta) return HttpHelper.reqError(res, 'API - Usuario já cadastrado', 400)

        return next()

    } catch (error: any) {
        HttpHelper.reqError(res, error)
    }

}