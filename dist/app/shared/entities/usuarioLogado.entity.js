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
exports.UsuarioLogadoEntity = void 0;
const typeorm_1 = require("typeorm");
let UsuarioLogadoEntity = class UsuarioLogadoEntity extends typeorm_1.BaseEntity {
    setDate() {
        this.dataLogin = new Date();
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'usuario_email' }),
    __metadata("design:type", String)
], UsuarioLogadoEntity.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_temporario' }),
    __metadata("design:type", String)
], UsuarioLogadoEntity.prototype, "idTemporario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_login' }),
    __metadata("design:type", Date)
], UsuarioLogadoEntity.prototype, "dataLogin", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuarioLogadoEntity.prototype, "setDate", null);
UsuarioLogadoEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'usuarios_logados' })
], UsuarioLogadoEntity);
exports.UsuarioLogadoEntity = UsuarioLogadoEntity;
//# sourceMappingURL=usuarioLogado.entity.js.map