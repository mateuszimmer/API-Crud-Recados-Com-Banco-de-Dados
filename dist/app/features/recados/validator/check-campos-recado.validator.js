"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCamposRecados = void 0;
const http_helper_1 = require("../../../shared/util/http.helper");
const checkCamposRecados = (req, res, next) => {
    const { titulo, descricao, data, usuario } = req.body;
    if (!titulo || !descricao || !data || !usuario) {
        return http_helper_1.HttpHelper.reqError(res, 'Todas as informações devem ser preenchidas', 400);
    }
    return next();
};
exports.checkCamposRecados = checkCamposRecados;
//# sourceMappingURL=check-campos-recado.validator.js.map