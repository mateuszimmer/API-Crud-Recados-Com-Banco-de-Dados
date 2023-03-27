"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recadoRoutes = void 0;
const express_1 = require("express");
const check_logado_middleware_1 = require("../../../shared/middlewares/check-logado.middleware");
const recados_controller_1 = require("../controllers/recados.controller");
const check_campos_recado_validator_1 = require("../validator/check-campos-recado.validator");
const recadoRoutes = (0, express_1.Router)();
exports.recadoRoutes = recadoRoutes;
recadoRoutes.post('/novorecado', [check_campos_recado_validator_1.checkCamposRecados, check_logado_middleware_1.checkLogado], new recados_controller_1.RecadosController().create);
recadoRoutes.get('/:id', new recados_controller_1.RecadosController().getById);
recadoRoutes.get('/listar/:token', [check_logado_middleware_1.checkLogado], new recados_controller_1.RecadosController().getByUser);
recadoRoutes.put('/:id', [check_campos_recado_validator_1.checkCamposRecados, check_logado_middleware_1.checkLogado], new recados_controller_1.RecadosController().update);
recadoRoutes.delete('/:usuario', [check_logado_middleware_1.checkLogado], new recados_controller_1.RecadosController().delete);
//# sourceMappingURL=recados.routes.js.map