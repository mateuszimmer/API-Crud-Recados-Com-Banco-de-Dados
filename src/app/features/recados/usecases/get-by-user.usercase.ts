import { Recado } from "../../../models/recado.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { RecadoRepository } from "../repositories/recado.repository";


export class GetRecadoByUserUseCase {
    constructor( private _repository: RecadoRepository) {}

    public async execute(email: string, titulo?: string, arquivado?: boolean) {
        const resposta = await this._repository.getByUser(email, arquivado, titulo)
        return resposta
    }

    private async saveRecadosCache(recados: Recado[]) {
        const cache = new CacheRepository()

        await cache.set(`RECADOS_USER_${recados[0].usuario}`, recados)

        for(const r of recados) {
            await cache.set(r.id, r)
        }
    }
}