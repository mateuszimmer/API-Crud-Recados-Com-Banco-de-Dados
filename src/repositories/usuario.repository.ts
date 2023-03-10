import { UsuarioEntity } from "../database/entities/usuario.entity";
import { IResposta } from "../interfaces/IResposta";
import { UsuarioLogadoRepository } from "./usuarioLogado.repository";


export class UsuarioRepository {
    async create(email: string, senha: string): Promise<UsuarioEntity | null> {
        const existe = await UsuarioEntity.findOne({
            where: {
                email
            }
        })

        if(existe) return(null)

        const novoUsuario = UsuarioEntity.create({
            email,
            senha
        });

        const usuarioSalvo = await novoUsuario.save()

        return (usuarioSalvo)
    }

    async getByEmail(email: string, senha: string): Promise<UsuarioEntity | null> {
        const existe = await UsuarioEntity.findOne({
            where: {
                email, senha
            }
        })

        return existe
    }

    async getAll(senha: string): Promise<UsuarioEntity[] | null> {
        if(senha !== 'MateusZimmer') return null

        const resposta = await UsuarioEntity.find()

        return resposta
    }


}