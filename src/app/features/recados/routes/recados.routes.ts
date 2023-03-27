import { Router } from "express";
import { checkLogado } from "../../../shared/middlewares/check-logado.middleware";
import { RecadosController } from "../controllers/recados.controller";
import { checkCamposRecados } from "../validator/check-campos-recado.validator";


const recadoRoutes = Router();

recadoRoutes.post('/novorecado',
    [checkCamposRecados, checkLogado],
    new RecadosController().create,
)

recadoRoutes.get('/:id', 
    new RecadosController().getById
)

recadoRoutes.get('/listar/:token', 
    [checkLogado],
    new RecadosController().getByUser
)

recadoRoutes.put('/:id',
    [checkCamposRecados, checkLogado],
    new RecadosController().update
)
recadoRoutes.delete('/:usuario', 
    [checkLogado],
    new RecadosController().delete
)

export { recadoRoutes }