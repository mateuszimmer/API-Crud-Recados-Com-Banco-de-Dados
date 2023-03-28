import { Recado } from "../../../models/recado.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { RecadoEntity } from "../../../shared/entities/recado.entity";
import { IRecado } from "../../../shared/interfaces/IRecado";
import { RecadoRepository } from "../repositories/recado.repository";

export class UpdateRecadoUsecase {

    constructor(private _repository: RecadoRepository) {}

    public async execute(id: string, recado: Partial<IRecado>) {
        const recadoUpdate = await this._repository.getById(id, recado.usuario);
        
        if (!recadoUpdate) return null;

        recadoUpdate.titulo = recado.titulo? recado.titulo : recadoUpdate.titulo;
        recadoUpdate.descricao = recado.descricao? recado.descricao : recadoUpdate.descricao;
        recadoUpdate.data = recado.data? recado.data : recadoUpdate.data;
        recadoUpdate.arquivado = recado.arquivado? recado.arquivado : recadoUpdate.arquivado;

        const resposta = await this._repository.update(recadoUpdate);

        if(resposta) this.saveToCache(resposta);

        return resposta;
    }

    private async saveToCache(recado: Recado) {
        const cache = new CacheRepository();
        await cache.setEX(recado.id, recado, 300);

        const lista = await cache.get(`RECADOS_USER_${recado.usuario}`) || [];

        const indice = lista.findIndex((rec: RecadoEntity) => rec.id === recado.id);

        if(indice >= 0) {
            lista[indice] = recado;
            await cache.setEX(`RECADOS_USER_${recado.usuario}`, lista, 300);
        }
    }
}