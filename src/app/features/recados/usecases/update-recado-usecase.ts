import { IRecado } from "../../../shared/interfaces/IRecado";
import { RecadoRepository } from "../repositories/recado.repository";

export class UpdateRecadoUsecase {

    constructor(private _repository: RecadoRepository) {}

    public async execute(id: string, recado: Partial<IRecado>) {
        const recadoUpdate = {
            id,
            recado
        }

        const resposta = await this._repository.update(recadoUpdate)
        return resposta
    }
}