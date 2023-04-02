import { Recado } from "../../../models/recado.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { RecadoRepository } from "../repositories/recado.repository";


export class GetRecadoByUserUseCase {
    constructor( private _repository: RecadoRepository) {}

    public async execute(email: string, titulo?: string, arquivado?: boolean) {
        let dadosCache = await this.getRecadosCache(email);

        if(!dadosCache) {
            dadosCache = await this._repository.getByUser(email)
            await this.saveRecadosCache(dadosCache)
        };

        dadosCache = dadosCache.filter((recado: Recado) => recado.titulo.toLowerCase().includes(titulo?.toLowerCase() ?? ''));
        if(arquivado !== undefined) dadosCache = dadosCache.filter((recado: Recado) => recado.arquivado === arquivado);

        return dadosCache;
    }

    private async getRecadosCache(email: string){
        const cache = new CacheRepository();
        const dadosCache = await cache.get(`RECADOS_USER_${email}`)
        return dadosCache
    }

    private async saveRecadosCache(recados: Recado[]) {
        const cache = new CacheRepository()

        await cache.setEX(`RECADOS_USER_${recados[0].usuario}`, recados, 300)

        for(const r of recados) {
            await cache.setEX(r.id, r, 300)
        }
    }
}