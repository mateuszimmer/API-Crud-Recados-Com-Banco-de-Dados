import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { RecadoEntity } from "./recado.entity";

@Entity({ name: 'usuarios' })
export class UsuarioEntity extends BaseEntity {

    @PrimaryColumn({ name: 'email' })
    email!: string;

    @Column()
    senha!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt?: Date;

    @OneToMany(() => RecadoEntity, fk => fk.usuarioRecado)
    @JoinColumn({ name: 'email', referencedColumnName: 'email_usuario' })
    recados?: RecadoEntity[]

}