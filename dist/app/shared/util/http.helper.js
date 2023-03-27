"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpHelper = void 0;
class HttpHelper {
    static success(res, data, message, code) {
        return res.status(code !== null && code !== void 0 ? code : 200).send({
            success: true,
            message,
            data,
        });
    }
    ;
    static reqError(res, message, code) {
        return res.status(code !== null && code !== void 0 ? code : 400).send({
            success: false,
            message,
            data: null
        });
    }
    static serverError(res, message, code) {
        return res.status(code !== null && code !== void 0 ? code : 500).send({
            success: false,
            message,
            data: null
        });
    }
    ;
}
exports.HttpHelper = HttpHelper;
//# sourceMappingURL=http.helper.js.map