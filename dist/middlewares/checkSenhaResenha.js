"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSenhaResenha = void 0;
const checkSenhaResenha = (req, res, next) => {
    const { senha, reSenha } = req.body;
    if (senha !== reSenha)
        return res
            .status(400)
            .json({
            success: false,
            message: 'Senha e reSenha não conferem.',
            data: null
        });
    next();
};
exports.checkSenhaResenha = checkSenhaResenha;
//# sourceMappingURL=checkSenhaResenha.js.map