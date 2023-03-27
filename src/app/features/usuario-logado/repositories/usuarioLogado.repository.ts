import { UsuarioLogadoEntity } from "../../../shared/entities/usuarioLogado.entity";
import { v4 as uuid } from 'uuid'
import { DeleteResult } from "typeorm";

export class UsuarioLogadoRepository {
    async setLogado(email: string): Promise<UsuarioLogadoEntity> {
        const novoRegistro = UsuarioLogadoEntity.create({
            usuario: email,
            idTemporario: uuid(),
        })

        const resposta = await novoRegistro.save()
        return resposta
    }

    async usuarioLogado(id: string): Promise<string | null> {
        
        const resposta = await UsuarioLogadoEntity.findOne({
            where: {
                idTemporario: id
            }
        });

        if (!resposta) return null

        return resposta.usuario
    }

    async deleteLogado(id: string): Promise<DeleteResult | null> {
        const chave = await UsuarioLogadoEntity.findOne({
            where: {
                idTemporario: id
            }})
        
        if (chave) {
            const resposta = await UsuarioLogadoEntity.delete(chave.usuario)
            return resposta
        }

        return null
    }
}