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
exports.CreateTableUsuariosLogados1677510544482 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableUsuariosLogados1677510544482 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('usuarios_logados', true, true, true);
        });
    }
}
exports.CreateTableUsuariosLogados1677510544482 = CreateTableUsuariosLogados1677510544482;
//# sourceMappingURL=1677510544482-CreateTableUsuariosLogados.js.map