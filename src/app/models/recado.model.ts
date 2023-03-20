import { v4 as uuid } from 'uuid'

export class Recado {
    public id: string;
    public titulo: string;
    public descricao: string;
    public data: string;
    public usuario: string;
    public arquivado: boolean;

    private constructor(
        titulo: string,
        descricao: string,
        data: string,
        usuario: string,
        arquivado?: boolean | undefined,
        id?: string
        ) {
            this.id = id ?? uuid()
            this.titulo = titulo
            this.descricao = descricao
            this.data = data
            this.usuario = usuario
            this.arquivado = arquivado ?? false
        }

    public static create(
        titulo: string, descricao: string, data: string, usuario: string, arquivado?: boolean, id?: string
    ) {
        return new Recado(titulo, descricao, data, usuario, arquivado, id);
    }
}