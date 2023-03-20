import { UsuarioEntity } from "../../../shared/entities/usuario.entity";
import { UsuarioRepository } from "../repositories/usuario.repository";


export class ListarUsuariosUseCase {
    constructor( private _repository: UsuarioRepository) {}

    public async list (senha: string) {
        const retorno = await this._repository.getAll(senha)
        return retorno
    }
}