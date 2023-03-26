import { Request } from "express";
import { RecadoRepository } from "../repositories/recado.repository";

export class GetRecadoByIdUseCase {
    constructor(private _repository: RecadoRepository) {}

    public async execute(id: string) {
        const resposta = await this._repository.getById(id);

        return resposta
    }
}