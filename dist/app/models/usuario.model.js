"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(email, senha) {
        this.email = email;
        this.senha = senha;
        this.email = email,
            this.senha = senha;
    }
    static criate(email, senha) {
        return new Usuario(email, senha);
    }
    toJson() {
        return {
            email: this.email,
            senha: this.senha
        };
    }
}
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.model.js.map