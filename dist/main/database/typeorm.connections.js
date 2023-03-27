"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
require("dotenv/config");
require("reflect-metadata");
const database_config_1 = __importDefault(require("../config/database.config"));
class DatabaseConnection {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._connection) {
                this._connection = yield database_config_1.default.initialize();
                console.log('Conectado ao banco de dados');
            }
        });
    }
    static get connection() {
        if (!this._connection) {
            throw new Error("Database não conectado");
        }
        return this._connection;
    }
}
exports.DatabaseConnection = DatabaseConnection;
//# sourceMappingURL=typeorm.connections.js.map