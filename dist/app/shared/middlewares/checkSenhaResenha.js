"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSenhaResenha = void 0;
const http_helper_1 = require("../util/http.helper");
const checkSenhaResenha = (req, res, next) => {
    const { senha, reSenha } = req.body;
    if (senha !== reSenha) {
        return http_helper_1.HttpHelper.reqError(res, 'Senha e reSenha não conferem.', 400);
    }
    next();
};
exports.checkSenhaResenha = checkSenhaResenha;
//# sourceMappingURL=checkSenhaResenha.js.map