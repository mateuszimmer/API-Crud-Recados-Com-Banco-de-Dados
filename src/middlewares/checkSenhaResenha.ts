import { Request, Response, NextFunction } from "express";
import { IResposta } from "../interfaces/IResposta";

export const checkSenhaResenha = (req: Request, res: Response, next: NextFunction) => {
    const { senha, reSenha } = req.body

    if(senha !== reSenha) return res
        .status(400)
        .json({
            success: false,
            message: 'Senha e reSenha não conferem.',
            data: null
        } as IResposta)

    next()        
}