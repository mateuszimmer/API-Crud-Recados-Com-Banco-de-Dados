import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from "typeorm";
import config from "../config/database.config";

export class DatabaseConnection {
  private static _connection: DataSource;

    public static async connect() {
        if(!this._connection) {
            this._connection = await config.initialize()
            console.log('Conectado ao banco de dados')
        }
    }

    public static get connection() {
        if(!this._connection) {
            throw new Error("Database não conectado");
        }
        
        return this._connection;
    }

    public static async destroy() {
        if(!this._connection) {
            throw new Error("O Banco de Dados não está iniciado.");
        };

        console.log('Encerrando conexão...');

        await this._connection.destroy();

        console.log('Conexão com o banco de dados encerrada.')
    }
}