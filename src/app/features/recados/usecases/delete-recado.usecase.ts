import { RecadoRepository } from "../repositories/recado.repository";

export class DeletarRecadoUseCase {
    constructor(private _repository: RecadoRepository) {}

    public async execute(id: string, usuario: string) {
        const resposta = await this._repository.delete(id, usuario)
        return
    }
}