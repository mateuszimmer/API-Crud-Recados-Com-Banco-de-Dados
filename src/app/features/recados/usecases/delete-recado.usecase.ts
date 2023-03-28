import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { RecadoEntity } from "../../../shared/entities/recado.entity";
import { RecadoRepository } from "../repositories/recado.repository";

export class DeletarRecadoUseCase {
    constructor(private _repository: RecadoRepository) {}

    public async execute(id: string, usuario: string) {
        const resposta = await this._repository.delete(id, usuario)
        this.saveToCache(id, usuario)
        return resposta 
    }

    private async saveToCache(id: string, usuario: string) {
        const cache = new CacheRepository();
        await cache.del(id);

        const lista = await cache.get(`RECADOS_USER_${usuario}`) || [];

        const retorno = lista.filter((rec: RecadoEntity) => rec.id !== id);
        
        await cache.setEX(`RECADOS_USER_${usuario}`, retorno, 300);
    }
}