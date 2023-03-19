import { Express } from 'express'
import { checkEmailESenha } from '../../app/shared/middlewares/checkEmailESenha';
import { checkSenhaResenha } from '../../app/shared/middlewares/checkSenhaResenha';
import { UsuarioController } from '../../app/features/usuario/controllers/usuario.controller';
import { RecadosController } from '../../app/features/recados/controllers/recados.controller';
import { UsuarioLogadoController } from '../../app/features/usuario-logado/controllers/usuario-logado.controller';
import { usuarioRoutes } from '../../app/features/usuario/routes/usuario.routes';

export const makeRoutes = (app: Express) => {
    app.get('/', (_, response) => response.send('API Recados rodando! (Arquitetura)'))

    app.use('/usuario', usuarioRoutes)


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