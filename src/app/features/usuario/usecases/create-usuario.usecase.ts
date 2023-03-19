import { Usuario } from "../../../models/usuario.model";
import { UsuarioRepository } from "../repositories/usuario.repository";

export class CreateUsuarioUseCase {
    constructor( private _repository: UsuarioRepository ) {}

    public async execute( data: Usuario ) {

        const usuario = Usuario.criate(data.email, data.senha);

        const result = await this._repository.create(usuario);

        if (result) return result.toJson();

        return result;
    }
}