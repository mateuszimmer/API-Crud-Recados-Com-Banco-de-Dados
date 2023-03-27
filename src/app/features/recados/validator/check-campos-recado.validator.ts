import { NextFunction, Request, Response } from "express"
import { HttpHelper } from "../../../shared/util/http.helper"

export const checkCamposRecados = (req: Request, res: Response, next: NextFunction) => {

    const { titulo, descricao, data, usuario } = req.body

    if(!titulo || !descricao || !data || !usuario) {
        return HttpHelper.reqError(res, 'Todas as informações devem ser preenchidas', 400)
    }

    return next()
}





