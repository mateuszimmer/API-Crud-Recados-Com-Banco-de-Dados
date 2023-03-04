import "dotenv/config";
import { DataSourceOptions } from "typeorm";
import { RecadoEntity } from "./entities/recado.entity";
import { UsuarioEntity } from "./entities/usuario.entity";
import { UsuarioLogadoEntity } from "./entities/usuarioLogado.entity";
import { CreateTableUsuario1677495888053 } from "./migrations/1677495888053-CreateTableUsuario";
import { CreateTableRecados1677508413621 } from "./migrations/1677508413621-CreateTableRecados";
import { CreateTableUsuariosLogados1677510544482 } from "./migrations/1677510544482-CreateTableUsuariosLogados";

const config: DataSourceOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [RecadoEntity, UsuarioEntity, UsuarioLogadoEntity],
  migrations: [CreateTableRecados1677508413621, CreateTableUsuario1677495888053, CreateTableUsuariosLogados1677510544482],
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};

export default config;