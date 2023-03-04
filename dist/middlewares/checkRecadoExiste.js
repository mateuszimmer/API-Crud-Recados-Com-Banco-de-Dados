"use strict";
// import { Response, Request, NextFunction } from "express"
// import { IResposta } from "../interfaces/IResposta"
// import { storeRecados } from "../store"
// export const checkRecadoExiste = (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.body || req.params
//     const existeRecado = storeRecados.some(r => r.id === id)
//     if(!id || !existeRecado) {
//         res.status(404)
//             .json({
//                 success: false,
//                 message: 'Recado não localizado',
//                 data: null
//             } as IResposta)
//     }
//     next()
// }
//# sourceMappingURL=checkRecadoExiste.js.map