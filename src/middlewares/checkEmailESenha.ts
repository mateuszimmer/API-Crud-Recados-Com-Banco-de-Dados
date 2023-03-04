import { Request, Response, NextFunction } from "express";
import { IResposta } from "../interfaces/IResposta";

export const checkEmailESenha = (req: Request, res: Response, next: NextFunction) => {
    const { email, senha } = req.body

    if(!email || !senha) {
        return res
            .status(402)
            .json({
                success: false,
                message: 'Informações faltantes',
                data: null        
            } as IResposta)
    }

    next()
}