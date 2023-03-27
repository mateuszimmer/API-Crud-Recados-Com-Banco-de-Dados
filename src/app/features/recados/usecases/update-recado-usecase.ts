import { Recado } from "../../../models/recado.model";
import { IRecado } from "../../../shared/interfaces/IRecado";
import { RecadoRepository } from "../repositories/recado.repository";

export class UpdateRecadoUsecase {

    constructor(private _repository: RecadoRepository) {}

    public async execute(id: string, recado: Partial<IRecado>) {
        const recadoUpdate = await this._repository.getById(id, recado.usuario)
        
        if (!recadoUpdate) return null

        recadoUpdate.titulo = recado.titulo? recado.titulo : recadoUpdate.titulo
        recadoUpdate.descricao = recado.descricao? recado.descricao : recadoUpdate.descricao 
        recadoUpdate.data = recado.data? recado.data : recadoUpdate.data 
        recadoUpdate.arquivado = recado.arquivado? recado.arquivado : recadoUpdate.arquivado 

        const resposta = await this._repository.update(recadoUpdate)
        return resposta
    }
}