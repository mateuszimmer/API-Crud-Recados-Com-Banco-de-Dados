"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRoutes = void 0;
const express_1 = require("express");
const checkEmailESenha_1 = require("../../../shared/middlewares/checkEmailESenha");
const checkSenhaResenha_1 = require("../../../shared/middlewares/checkSenhaResenha");
const usuario_controller_1 = require("../controllers/usuario.controller");
const verifica_existe_usuario_validator_1 = require("../validator/verifica-existe-usuario.validator");
const usuarioRoutes = (0, express_1.Router)();
exports.usuarioRoutes = usuarioRoutes;
usuarioRoutes.post('/novo', [checkSenhaResenha_1.checkSenhaResenha, checkEmailESenha_1.checkEmailESenha, verifica_existe_usuario_validator_1.verificaExisteUsuario], new usuario_controller_1.UsuarioController().criate);
usuarioRoutes.post('/logar', [checkEmailESenha_1.checkEmailESenha], new usuario_controller_1.UsuarioController().logarUser);
usuarioRoutes.get('/list/:senha', new usuario_controller_1.UsuarioController().getAll);
//# sourceMappingURL=usuario.routes.js.map