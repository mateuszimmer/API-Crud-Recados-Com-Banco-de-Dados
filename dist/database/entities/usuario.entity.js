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
exports.UsuarioEntity = void 0;
const typeorm_1 = require("typeorm");
const recado_entity_1 = require("./recado.entity");
let UsuarioEntity = class UsuarioEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'email' }),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsuarioEntity.prototype, "senha", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], UsuarioEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], UsuarioEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recado_entity_1.RecadoEntity, fk => fk.usuarioRecado),
    (0, typeorm_1.JoinColumn)({ name: 'email', referencedColumnName: 'email_usuario' }),
    __metadata("design:type", Array)
], UsuarioEntity.prototype, "recados", void 0);
UsuarioEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'usuarios' })
], UsuarioEntity);
exports.UsuarioEntity = UsuarioEntity;
//# sourceMappingURL=usuario.entity.js.map