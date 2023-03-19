import { v4 as uuid } from 'uuid'

export class Recado {
    private id: string;
    private titulo: string;
    private descricao: string;
    private data: string;
    private usuario: string;
    private arquivado: boolean;

    private constructor(
        titulo: string,
        descricao: string,
        data: string,
        usuario: string,
        arquivado: boolean,
        id?: string
        ) {
            this.id = id ?? uuid()
            this.titulo = titulo
            this.descricao = descricao
            this.data = data
            this.usuario = usuario
            this.arquivado = arquivado
        }

    public static create(
        titulo: string, descricao: string, data: string, usuario: string, arquivado: boolean, id?: string
    ) {
        return new Recado(titulo, descricao, data, usuario, arquivado, id);
    }
}