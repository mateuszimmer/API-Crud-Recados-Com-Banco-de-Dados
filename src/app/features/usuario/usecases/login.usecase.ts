import { Usuario } from "../../../models/usuario.model";
import { UsuarioRepository } from "../repositories/usuario.repository";


export class LogarUsuario {
    constructor( private _repository: UsuarioRepository ) {}

    public async execute( usuario: Usuario ){

        const resposta = await this._repository.getByEmail(usuario.email, usuario.senha)
        
        if (resposta){
            const repositoryLogado = new UsuarioLogadoRepository();
            const token = (await repositoryLogado.setLogado(email)).idTemporario

            return res.status(200).json(
                {
                    success: true,
                    message: 'API - Autorizado',
                    data: token
                } as IResposta
            )
        }

        return res.status(404).json(
            {
                success: false,
                message: 'Não autorizado',
                data: null
            } as IResposta
        )



    }
}