"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableRecados1677508413621 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableRecados1677508413621 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('recados', true, true, true);
        });
    }
}
exports.CreateTableRecados1677508413621 = CreateTableRecados1677508413621;
//# sourceMappingURL=1677508413621-CreateTableRecados.js.map