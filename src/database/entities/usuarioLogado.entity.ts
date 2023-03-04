import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn } from "typeorm";


@Entity({ name: 'usuarios_logados' })
export class UsuarioLogadoEntity extends BaseEntity {

    @PrimaryColumn({ name: 'usuario_email' })
    usuario!: string;

    @Column({ name: 'id_temporario' })
    idTemporario!: string;

    @Column({ name: 'data_login' })
    dataLogin!: Date;

    @BeforeInsert()
    @BeforeUpdate()
    setDate(){
        this.dataLogin = new Date();
    }
}