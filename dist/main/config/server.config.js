"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const routes_server_1 = require("../server/routes.server");
const cors_1 = __importDefault(require("cors"));
const createServer = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    (0, routes_server_1.makeRoutes)(app);
    return app;
};
exports.createServer = createServer;
//# sourceMappingURL=server.config.js.map