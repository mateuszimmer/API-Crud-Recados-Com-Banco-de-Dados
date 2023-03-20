import { Router } from "express";
import { checkEmailESenha } from "../../../shared/middlewares/checkEmailESenha";
import { checkSenhaResenha } from "../../../shared/middlewares/checkSenhaResenha";
import { UsuarioController } from "../controllers/usuario.controller";
import { verificaExisteUsuario } from "../validator/verifica-existe-usuario.validator";

const usuarioRoutes = Router()

usuarioRoutes.post('/novo', 
    [ checkSenhaResenha, checkEmailESenha, verificaExisteUsuario ], 
    new UsuarioController().criate,
)

usuarioRoutes.post('/logar', 
    [ checkEmailESenha ],  
    new UsuarioController().logarUser,
)

usuarioRoutes.get('/list/:senha', 
    new UsuarioController().getAll
)

export { usuarioRoutes }