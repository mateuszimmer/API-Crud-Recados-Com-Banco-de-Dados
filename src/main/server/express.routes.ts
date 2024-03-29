import { Express } from 'express';
import { usuarioRoutes } from '../../app/features/usuario/routes/usuario.routes';
import { recadoRoutes } from '../../app/features/recados/routes/recados.routes';
import { usuarioLogadoRoutes } from '../../app/features/usuario-logado/routes/usuario-logado.routes';

export const makeRoutes = (app: Express) => {
    app.get('/', (_, response) => response.send('API Recados rodando! (Arquitetura)'));

    app.use('/usuario', usuarioRoutes);

    app.use('/recado', recadoRoutes);

    app.use('/usuarioLogado', usuarioLogadoRoutes);
};