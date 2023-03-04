"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkEmailESenha_1 = require("./middlewares/checkEmailESenha");
const checkSenhaResenha_1 = require("./middlewares/checkSenhaResenha");
const usuario_controller_1 = require("./controllers/usuario.controller");
const recados_controller_1 = require("./controllers/recados.controller");
const usuarioLogado_controller_1 = require("./controllers/usuarioLogado.controller");
exports.default = (app) => {
    app.get('/', (request, response) => response.send('Está Funcionando'));
    const usuarioController = new usuario_controller_1.UsuarioController();
    app.post('/usuario/novo', [checkSenhaResenha_1.checkSenhaResenha, checkEmailESenha_1.checkEmailESenha], usuarioController.criate);
    app.post('/logar', [checkEmailESenha_1.checkEmailESenha], usuarioController.logarUser);
    app.get('/usuarios/:senha', usuarioController.getAll);
    const recadoController = new recados_controller_1.RecadosController();
    app.post('/recados/novorecado', recadoController.create);
    app.get('/recado/:id', recadoController.getById);
    app.get('/usuario/:token/recados', recadoController.getByUser);
    app.put('/recado/:id', recadoController.update);
    app.delete('/recado/delete/:token', recadoController.delete);
    const usuarioLogadoController = new usuarioLogado_controller_1.UsuarioLogadoController();
    app.get('/usuarioLogado/:token', usuarioLogadoController.getUserLoggedById);
    app.delete('/logout/:token', usuarioLogadoController.logoutUser);
};
// Usuarios
// router.delete('/logout/:id', (req: Request, res: Response) => {
//     removeUserArrayUsuariosLogados(req, res)
// })
// router.get('/usuarioLogado/:id', (req: Request, res: Response) => {
//     verificaUsuarioLogado(req, res)
// })
// // Recados
// router.get('/recados/:id',[ checkUsuarioLogado ], (req: Request, res: Response) => {
//     getUserRecados(req, res)
// })
// router.post('/recados/novorecado', [ checkUsuarioLogado ], (req: Request, res: Response) => {
//     cadastraRecado(req, res)
// })
// router.put('/recados', [ checkUsuarioLogado, checkRecadoExiste ], (req: Request, res: Response ) => {
//     alteraRecado(req, res)
// })
// // Rotas para carregar todas informações
// router.get('/todosrecados', (req: Request, res: Response) => {
//     return res.status(200).send({
//         dados: storeRecados
//     })
// })
// router.get('/todosusuarios', (req: Request, res: Response) => {
//     return res.status(200).send({
//         dados: storeUsuarios
//     })
// })
// router.get('/todosusuarioslogados', (req: Request, res: Response) => {
//     return res.status(200).send({
//         dados: storeUsuariosLogados
//     })
// })
//# sourceMappingURL=routes.js.map