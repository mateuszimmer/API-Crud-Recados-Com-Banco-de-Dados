import { DeleteResult, ILike, Like } from "typeorm"
import { RecadoEntity } from "../database/entities/recado.entity"

export class RecadoRepository {
    async create(titulo: string, descricao: string, data: string, usuario: string): Promise<RecadoEntity> {
        const novoRecado = RecadoEntity.create(
            {
                titulo,
                descricao,
                data,
                usuario
            }
        )

        const resposta = await novoRecado.save()

        return resposta
    }

    async getById(id: string, usuario?: string): Promise<RecadoEntity | null> {

        const pesquisa = await RecadoEntity.findOne({
            where: {
                id,
                usuario
            }
        })

        return pesquisa
    }

    async getByUser(email: string, arquivado?: boolean, titulo?: string): Promise<RecadoEntity[]> {
        if(titulo) {
            const recados = await RecadoEntity.find({
                where: {
                    usuario: email,
                    titulo: ILike(`%${titulo}%`),
                    arquivado: (arquivado? true : false)
                } 
            })
            return recados
        } else {
            const recados = await RecadoEntity.find({
                where: {
                    usuario: email,
                    arquivado: arquivado? true : false,
                } 
            })
            return recados
        }

    }

    async update(id: string, titulo: string, descricao: string, data: string, usuario: string, arquivado: boolean): Promise<RecadoEntity | null>{
        const recado = await this.getById(id, usuario)
        if(!recado) return null

        recado.titulo = titulo
        recado.descricao = descricao
        recado.data = data
        recado.arquivado = arquivado

        const retorno = await recado.save()
        
        return retorno
    }

    async delete(id: string, usuario: string): Promise<void | null | DeleteResult>{

        const retorno = await RecadoEntity.delete({
            id,
            usuario
        })
        return retorno
    }
}