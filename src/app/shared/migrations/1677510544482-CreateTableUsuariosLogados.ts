import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableUsuariosLogados1677510544482 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'usuarios_logados',
                columns: [
                    {
                        name: 'usuario_email',
                        type: 'varchar',
                        length: '100',
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: 'id_temporario',
                        type: 'varchar',
                        length: '36',
                        isNullable: false
                    },
                    {
                        name: 'data_login',
                        type: 'timestamp',
                        isNullable: false,
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fk_logado_usuario',
                        columnNames: ['usuario_email'],
                        referencedColumnNames: ['email'],
                        referencedTableName: 'usuarios',
                        onDelete: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuarios_logados', true, true, true)
    }

}
