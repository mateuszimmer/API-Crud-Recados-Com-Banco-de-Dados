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

// recadoRoutes.get('/usuario/:token/recados', recadoController.getByUser)
// recadoRoutes.put('/recado/:id', recadoController.update)
// recadoRoutes.delete('/recado/delete/:token', recadoController.delete)

export { recadoRoutes }