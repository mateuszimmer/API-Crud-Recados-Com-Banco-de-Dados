import { Request, Response, NextFunction } from "express";
import { IResposta } from "../interfaces/IResposta";
import { HttpHelper } from "../util/http.helper";

export const checkSenhaResenha = (req: Request, res: Response, next: NextFunction) => {
    const { senha, reSenha } = req.body

    if(senha !== reSenha) {
        return HttpHelper.reqError(
                res, 
                'Senha e reSenha não conferem.', 
                400
            )
}
    next()        
}