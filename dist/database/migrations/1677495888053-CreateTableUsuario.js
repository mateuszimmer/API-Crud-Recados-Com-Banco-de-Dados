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
exports.CreateTableUsuario1677495888053 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableUsuario1677495888053 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('usuarios', true, true, true);
        });
    }
}
exports.CreateTableUsuario1677495888053 = CreateTableUsuario1677495888053;
//# sourceMappingURL=1677495888053-CreateTableUsuario.js.map