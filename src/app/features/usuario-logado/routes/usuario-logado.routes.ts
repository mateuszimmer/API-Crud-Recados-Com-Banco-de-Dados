import { Router } from "express";
import { UsuarioLogadoController } from "../controllers/usuario-logado.controller";


const usuarioLogadoRoutes = Router();

usuarioLogadoRoutes.get('/:token', 
    new UsuarioLogadoController().getUserLoggedById
);

usuarioLogadoRoutes.delete('/:token',
    new UsuarioLogadoController().logoutUser
);

export { usuarioLogadoRoutes };