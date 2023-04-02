import { UsuarioLogadoEntity } from "../../../shared/entities/usuarioLogado.entity";
import { UsuarioLogadoRepository } from "../repositories/usuarioLogado.repository";


export class ObterUsuarioLogadoPorIdUseCase {
    constructor(private _repository: UsuarioLogadoRepository) {};

    public async execute(token: string): Promise<string | null> {
        const usuarioLogado = await this._repository.usuarioLogado(token)

        return usuarioLogado;
    }
}