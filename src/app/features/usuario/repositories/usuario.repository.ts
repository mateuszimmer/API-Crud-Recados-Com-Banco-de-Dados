import { DatabaseConnection } from "../../../../main/database/typeorm.connections";
import { Usuario } from "../../../models/usuario.model";
import { UsuarioEntity } from "../../../shared/entities/usuario.entity";
import { IResposta } from "../../../shared/interfaces/IResposta";
import { IUsuario } from "../../../shared/interfaces/IUsuario";
import { UsuarioLogadoRepository } from "../../usuario-logado/repositories/usuarioLogado.repository";


export class UsuarioRepository {

    private _repository = DatabaseConnection.connection.getRepository(UsuarioEntity)

    async create(usuario: Usuario): Promise<Usuario | null> {
        const usuarioSalvo = await this._repository.save(usuario)
        const resposta = this.toModelUsuario(usuarioSalvo)
        return resposta
    }

    async findByEmail(email: string): Promise<UsuarioEntity | null> {
        const search = await this._repository.findOne({
            where: {
                email
            }
        });

        return search;
    }

    public toModelUsuario(user: UsuarioEntity) {
        return Usuario.criate(user.email, user.senha)
    }

    async getByEmail(email: string, senha: string): Promise<UsuarioEntity | null> {
        const search = await UsuarioEntity.findOne({
            where: {
                email, senha
            }
        });

        return search;
    }

    async getAll(senha: string): Promise<UsuarioEntity[] | null> {
        if(senha !== 'MateusZimmer') return null

        const resposta = await UsuarioEntity.find()

        return resposta
    }


}