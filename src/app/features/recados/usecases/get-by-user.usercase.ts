import { RecadoRepository } from "../repositories/recado.repository";


export class GetRecadoByUserUseCase {
    constructor( private _repository: RecadoRepository) {}

    public async execute(email: string, titulo?: string, arquivado?: boolean) {
        const resposta = await this._repository.getByUser(email, arquivado, titulo)
        return resposta
    }
}