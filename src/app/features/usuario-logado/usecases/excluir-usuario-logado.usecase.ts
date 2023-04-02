import { DeleteResult } from "typeorm";
import { UsuarioLogadoRepository } from "../repositories/usuarioLogado.repository";


export class ExcluirUsuarioLogadoUseCase {
    constructor(private _repository: UsuarioLogadoRepository) {};

    public async execute(id: string): Promise<DeleteResult | null> {
        const resposta = await this._repository.deleteLogado(id);
        return resposta;
    };
};