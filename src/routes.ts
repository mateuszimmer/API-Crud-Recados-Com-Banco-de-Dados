import { Express } from 'express'
import { checkEmailESenha } from './middlewares/checkEmailESenha';
import { checkSenhaResenha } from './middlewares/checkSenhaResenha';
import { UsuarioController } from './controllers/usuario.controller';
import { RecadosController } from './controllers/recados.controller';
import { UsuarioLogadoController } from './controllers/usuarioLogado.controller';

export default (app: Express) => {
    app.get('/', (request, response) => response.send('Está Funcionando'))

    const usuarioController = new UsuarioController();
    app.post('/usuario/novo', [ checkSenhaResenha, checkEmailESenha ], usuarioController.criate)
    app.post('/logar', [ checkEmailESenha ], usuarioController.logarUser)
    app.get('/usuarios/:senha', usuarioController.getAll)

    const recadoController = new RecadosController();
    app.post('/recados/novorecado', recadoController.create)
    app.get('/recado/:id', recadoController.getById)
    app.get('/usuario/:token/recados', recadoController.getByUser)
    app.put('/recado/:id', recadoController.update)
    app.delete('/recado/delete/:token', recadoController.delete)

    const usuarioLogadoController = new UsuarioLogadoController()
    app.get('/usuarioLogado/:token', usuarioLogadoController.getUserLoggedById)
    app.delete('/logout/:token', usuarioLogadoController.logoutUser)

}

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