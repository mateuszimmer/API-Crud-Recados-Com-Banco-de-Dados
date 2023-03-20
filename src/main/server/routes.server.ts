import { Express } from 'express'
import { UsuarioLogadoController } from '../../app/features/usuario-logado/controllers/usuario-logado.controller';
import { usuarioRoutes } from '../../app/features/usuario/routes/usuario.routes';
import { recadoRoutes } from '../../app/features/recados/routes/recados.routes';

export const makeRoutes = (app: Express) => {
    app.get('/', (_, response) => response.send('API Recados rodando! (Arquitetura)'))

    app.use('/usuario', usuarioRoutes)

    app.use('/recado', recadoRoutes)

    const usuarioLogadoController = new UsuarioLogadoController()
    app.get('/usuarioLogado/:token', usuarioLogadoController.getUserLoggedById)
    app.delete('/logout/:token', usuarioLogadoController.logoutUser)

} 