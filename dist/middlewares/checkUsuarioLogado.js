"use strict";
// import { Request, Response, NextFunction } from "express";
// import { IResposta } from "../interfaces/IResposta";
// import { storeUsuariosLogados } from "../store";
// export const checkUsuarioLogado = (req: Request, res: Response, next: NextFunction) => {
//     const { usuario } = req.body
//     const { id } = req.params
//     const existe = storeUsuariosLogados.some(e => e.idTemporario === usuario)
//     const existeParams = storeUsuariosLogados.some(e => e.idTemporario === id)
//     if(!existe && !existeParams){
//         return res.status(404)
//             .json({
//                 success: false,
//                 message: 'Usuario não logado',
//                 data: null
//             } as IResposta)
//     }
//     next();
// }
//# sourceMappingURL=checkUsuarioLogado.js.map