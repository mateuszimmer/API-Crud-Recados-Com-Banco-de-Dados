"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmailESenha = void 0;
const http_helper_1 = require("../util/http.helper");
const checkEmailESenha = (req, res, next) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return http_helper_1.HttpHelper.reqError(res, 'Informações faltantes', 400);
    }
    next();
};
exports.checkEmailESenha = checkEmailESenha;
//# sourceMappingURL=checkEmailESenha.js.map