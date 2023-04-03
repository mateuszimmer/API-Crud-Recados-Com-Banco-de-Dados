import { Recado } from "../../../models/recado.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { RecadoEntity } from "../../../shared/entities/recado.entity";
import { RecadoRepository } from "../repositories/recado.repository";


export class CriarRecadoUseCase {
    constructor( private _repository: RecadoRepository) {}

    public async execute (recado: Recado) {
        const novoRecado = Recado.create(recado.titulo, recado.descricao, recado.data, recado.usuario);
        const result = await this._repository.create(novoRecado);

        this.saveToCache(result);

        return this.toModelRecado(result);
    }

    private async saveToCache(recado: Recado) {
        const cache = new CacheRepository();
        
        await cache.setEX(recado.id, recado, 300);

        const lista = await cache.get(`RECADOS_USER_${recado.usuario}`) || [];
        lista.push(recado);
        await cache.setEX(`RECADOS_USER_${recado.usuario}`, lista, 300);
        return;
    }

    public toModelRecado (recado: RecadoEntity) {
        return Recado.create(
                recado.titulo,
                recado.descricao,
                recado.data,
                recado.usuario,
                recado.arquivado,
                recado.id
        );
    };
};