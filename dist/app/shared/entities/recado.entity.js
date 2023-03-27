"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecadoEntity = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("./usuario.entity");
const uuid_1 = require("uuid");
let RecadoEntity = class RecadoEntity extends typeorm_1.BaseEntity {
    setInicial() {
        this.id = (0, uuid_1.v4)(),
            this.arquivado = false;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'recado_id' }),
    __metadata("design:type", String)
], RecadoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecadoEntity.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecadoEntity.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecadoEntity.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email_usuario' }),
    __metadata("design:type", String)
], RecadoEntity.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], RecadoEntity.prototype, "arquivado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], RecadoEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], RecadoEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.UsuarioEntity, fk => fk.recados),
    (0, typeorm_1.JoinColumn)({ name: 'email_usuario', referencedColumnName: 'email' }),
    __metadata("design:type", usuario_entity_1.UsuarioEntity)
], RecadoEntity.prototype, "usuarioRecado", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RecadoEntity.prototype, "setInicial", null);
RecadoEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'recados' })
], RecadoEntity);
exports.RecadoEntity = RecadoEntity;
//# sourceMappingURL=recado.entity.js.map