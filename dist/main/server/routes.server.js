"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRoutes = void 0;
const usuario_logado_controller_1 = require("../../app/features/usuario-logado/controllers/usuario-logado.controller");
const usuario_routes_1 = require("../../app/features/usuario/routes/usuario.routes");
const recados_routes_1 = require("../../app/features/recados/routes/recados.routes");
const makeRoutes = (app) => {
    app.get('/', (_, response) => response.send('API Recados rodando! (Arquitetura)'));
    app.use('/usuario', usuario_routes_1.usuarioRoutes);
    app.use('/recado', recados_routes_1.recadoRoutes);
    const usuarioLogadoController = new usuario_logado_controller_1.UsuarioLogadoController();
    app.get('/usuarioLogado/:token', usuarioLogadoController.getUserLoggedById);
    app.delete('/logout/:token', usuarioLogadoController.logoutUser);
};
exports.makeRoutes = makeRoutes;
//# sourceMappingURL=routes.server.js.map