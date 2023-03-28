import { DeleteResult, ILike } from "typeorm"
import { Recado } from "../../../models/recado.model";
import { RecadoEntity } from "../../../shared/entities/recado.entity"

export class RecadoRepository {
    async create(recado: Recado) {
        const novoRecado = RecadoEntity.create(
            {
                titulo: recado.titulo,
                descricao: recado.descricao,
                data: recado.data,
                usuario: recado.usuario
            }
        );

        const resposta = await novoRecado.save();

        return resposta;
    }

    async getById(id: string | undefined, usuario?: string): Promise<RecadoEntity | null> {

        const pesquisa = await RecadoEntity.findOne({
            where: {
                id,
                usuario
            }
        });

        return pesquisa;
    }

    async getByUser(email: string, arquivado?: boolean, titulo?: string): Promise<RecadoEntity[]> {
        const recados = await RecadoEntity.find({
            where: {
                usuario: email,                } 
        });
        
        return recados;
    }

    async update(novoRecado: Partial<Recado>): Promise<RecadoEntity | null>{
        const recado = await this.getById(novoRecado.id, novoRecado.usuario);
        if(!recado) return null;

        recado.titulo = novoRecado.titulo ? novoRecado.titulo : recado.titulo;
        recado.descricao = novoRecado.descricao ? novoRecado.descricao : recado.descricao;
        recado.data = novoRecado.data ? novoRecado.data : recado.data;
        recado.arquivado = novoRecado.arquivado ? novoRecado.arquivado : recado.arquivado;

        const retorno = await recado.save();
        
        return retorno;
    }

    async delete(id: string, usuario: string): Promise<void | null | DeleteResult>{

        const retorno = await RecadoEntity.delete({
            id,
            usuario
        });
        return retorno;
    }
}