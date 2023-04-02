import { Usuario } from "../../../models/usuario.model";
import { UsuarioLogadoRepository } from "../../usuario-logado/repositories/usuarioLogado.repository";
import { CriaUsuarioLogadoUseCase } from "../../usuario-logado/usecases/criar-usuario-logado.usecase";
import { UsuarioRepository } from "../repositories/usuario.repository";


export class LogarUsuario {
    constructor( private _repository: UsuarioRepository ) {}

    public async execute( usuario: Usuario ) {

        const resposta = await this._repository.getByEmail(usuario.email, usuario.senha)

        if (resposta){
            const token = await new CriaUsuarioLogadoUseCase(new UsuarioLogadoRepository()).setNovoUsuarioLogado(resposta)
            return token
        }

        return null
    }
}