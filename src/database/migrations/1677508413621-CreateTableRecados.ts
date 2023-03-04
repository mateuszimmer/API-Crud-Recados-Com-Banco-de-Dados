import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableRecados1677508413621 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'recados',
                columns: [
                    {
                        name: 'recado_id',
                        type: 'varchar',
                        length: '36',
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: 'titulo',
                        type: 'varchar',
                        length: '200',
                        isNullable: false,
                    },
                    {
                        name: 'descricao',
                        type: 'varchar',
                        length: '500',
                        isNullable: false,
                    },
                    {
                        name: 'data',
                        type: 'date',
                        isNullable: false,
                    },
                    {
                        name: 'email_usuario',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        isNullable: false,
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'arquivado',
                        type: 'boolean',
                        isNullable: false,
                        default: false
                    },
                ],
                foreignKeys: [
                    {
                        name: 'fk_recado_usuario',
                        columnNames: ['email_usuario'],
                        referencedTableName: 'usuarios',
                        referencedColumnNames: ['email'],
                        onDelete: 'CASCADE'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('recados', true, true, true)
    }

}
