import { Request } from "express";
import { Recado } from "../../../models/recado.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { RecadoRepository } from "../repositories/recado.repository";

export class GetRecadoByIdUseCase {
    constructor(private _repository: RecadoRepository) {}

    public async execute(id: string) {
        const resposta = await this._repository.getById(id);

        if(resposta) this.saveToCache(resposta)

        return resposta
    }

    private async saveToCache(recado: Recado) {
        const cache = new CacheRepository();
        await cache.set(recado.id, recado);

        const lista = await cache.get(`RECADOS_USER_${recado.usuario}`) || [];

        const indice = lista.indexOf((rec: Recado) => rec.id === recado.id);
        
        if(indice >= 0) {
            lista[indice] = recado;
            await cache.set(`RECADOS_USER_${recado.usuario}`, lista);
        }
    }
}