import { Recado } from "../../../models/recado.model";
import { RecadoEntity } from "../../../shared/entities/recado.entity";
import { RecadoRepository } from "../repositories/recado.repository";


export class CriarRecadoUseCase {
    constructor( private _repository: RecadoRepository) {}

    public async execute (recado: Recado) {
        const novoRecado = Recado.create(recado.titulo, recado.descricao, recado.data, recado.usuario)
        const result = await this._repository.create(novoRecado)

        return this.toModelRecado(result)
    }

    public toModelRecado (recado: RecadoEntity) {
        return Recado.create(
                recado.titulo,
                recado.descricao,
                recado.data,
                recado.usuario,
                recado.arquivado,
                recado.id
        )
    }
}