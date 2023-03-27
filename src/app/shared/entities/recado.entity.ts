import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid'


@Entity({ name: 'recados' })
export class RecadoEntity extends BaseEntity{

    @PrimaryColumn({ name: 'recado_id' })
    id!: string;

    @Column()
    titulo!: string;

    @Column()
    descricao!: string;

    @Column()
    data!: string;

    @Column({ name: 'email_usuario' })
    usuario!: string;

    @Column()
    arquivado!: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt?: Date;

    @ManyToOne(() => UsuarioEntity, fk => fk.recados)
    @JoinColumn({ name: 'email_usuario', referencedColumnName: 'email' })
    usuarioRecado?: UsuarioEntity;

    @BeforeInsert()
    setInicial() {
        this.id = uuid(),
        this.arquivado = false
    }

}