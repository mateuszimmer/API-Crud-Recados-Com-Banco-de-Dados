import { Usuario } from "../../../models/usuario.model";
import { UsuarioLogadoRepository } from "../repositories/usuarioLogado.repository";

export class CriaUsuarioLogadoUseCase {
    constructor( private _repository: UsuarioLogadoRepository ) {};

    public async setNovoUsuarioLogado(usuario: Usuario): Promise<string> {
        const token = (await this._repository.setLogado(usuario.email)).idTemporario;
        return token;
    };
}