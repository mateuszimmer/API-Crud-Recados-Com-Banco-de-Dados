"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmailESenha = void 0;
const checkEmailESenha = (req, res, next) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res
            .status(402)
            .json({
            success: false,
            message: 'Informações faltantes',
            data: null
        });
    }
    next();
};
exports.checkEmailESenha = checkEmailESenha;
//# sourceMappingURL=checkEmailESenha.js.map