import { Request } from "express";
import { Recado } from "../../../models/recado.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { RecadoRepository } from "../repositories/recado.repository";

export class GetRecadoByIdUseCase {
    constructor(private _repository: RecadoRepository) {}

    public async execute(id: string) {
        
        const cache = await this.getFromCache(id)
        
        if(cache) return cache

        const resposta = await this._repository.getById(id);
        if(resposta) this.saveToCache(resposta)

        return resposta
    }

    private async getFromCache(key: string) {
        const cache = new CacheRepository();
        const recado = cache.get(key)
        return recado
    }

    private async saveToCache(recado: Recado) {
        const cache = new CacheRepository();
        await cache.set(recado.id, recado);

        const lista = await cache.get(`RECADOS_USER_${recado.usuario}`) || [];

        const indice = lista.indexOf((rec: Recado) => rec.id === recado.id);
        
        if(indice >= 0) {
            lista[indice] = recado;
            await cache.setEX(`RECADOS_USER_${recado.usuario}`, lista, 300);
        }
    }
}