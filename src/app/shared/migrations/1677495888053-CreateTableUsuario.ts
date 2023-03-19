import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableUsuario1677495888053 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'usuarios',
                columns: [
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'senha',
                        type: 'varchar', 
                        length: '32',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuarios', true, true, true)
    }

}
