import { Request, Response, NextFunction } from "express";
import { IResposta } from "../interfaces/IResposta";
import { HttpHelper } from "../util/http.helper";

export const checkEmailESenha = (req: Request, res: Response, next: NextFunction) => {
    const { email, senha } = req.body

    if(!email || !senha) {
        return HttpHelper.reqError(
            res,
            'Informações faltantes',
            400
        )
    }

    next()
}