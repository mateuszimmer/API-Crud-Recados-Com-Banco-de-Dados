"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const pg_helper_1 = require("./database/pg-helper");
const api = (0, express_1.default)();
api.use(express_1.default.json(), (0, cors_1.default)());
(0, routes_1.default)(api);
pg_helper_1.pgHelper
    .connect()
    .then(() => {
    api.listen(process.env.PORT || 8080, () => console.log('API Rodando'));
});
//# sourceMappingURL=index.js.map