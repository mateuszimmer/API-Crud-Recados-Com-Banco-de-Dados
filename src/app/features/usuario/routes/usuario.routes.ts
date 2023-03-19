import { Router } from "express";
import { checkEmailESenha } from "../../../shared/middlewares/checkEmailESenha";
import { checkSenhaResenha } from "../../../shared/middlewares/checkSenhaResenha";
import { UsuarioController } from "../controllers/usuario.controller";

const usuarioRoutes = Router()

usuarioRoutes.post(
    '/novo', 
    [ checkSenhaResenha, checkEmailESenha ], 
    new UsuarioController().criate,
)

usuarioRoutes.post(
    '/logar', 
    [ checkEmailESenha ],  
    new UsuarioController().logarUser,
)

usuarioRoutes.get(
    '/:senha', 
    new UsuarioController().getAll
)

export { usuarioRoutes }