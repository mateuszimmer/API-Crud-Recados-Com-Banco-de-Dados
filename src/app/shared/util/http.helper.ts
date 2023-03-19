import { Response } from "express";
import { IResposta } from "../interfaces/IResposta";

export class HttpHelper{
    public static success(res: Response, data: any, message?: string, code?: number) {
        return res.status(code ?? 200).send({
            success: true,
            message,
            data,
        } as IResposta);
    };

    public static reqError(res: Response, message?: string, code?: number) {
        return res.status(code ?? 400).send({
            success: false,
            message,
            data: null
        } as IResposta);
    }

    public static serverError(res:Response, message?: string, code?: number) {
        return res.status(code ?? 500).send({
            success: false,
            message,
            data: null
        } as IResposta);
    };
}