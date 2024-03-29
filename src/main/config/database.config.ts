import "dotenv/config";
import { typeormEnv } from "../../app/envs/typeorm.env";
import { DataSource } from "typeorm";
import { RecadoEntity } from "../../app/shared/entities/recado.entity";
import { UsuarioEntity } from "../../app/shared/entities/usuario.entity";
import { UsuarioLogadoEntity } from "../../app/shared/entities/usuarioLogado.entity";
import { CreateTableUsuario1677495888053 } from "../../app/shared/migrations/1677495888053-CreateTableUsuario";
import { CreateTableRecados1677508413621 } from "../../app/shared/migrations/1677508413621-CreateTableRecados";
import { CreateTableUsuariosLogados1677510544482 } from "../../app/shared/migrations/1677510544482-CreateTableUsuariosLogados";


const minhasMigrations = [
  CreateTableRecados1677508413621, 
  CreateTableUsuario1677495888053, 
  CreateTableUsuariosLogados1677510544482
]

const minhasEntities =[
  RecadoEntity, 
  UsuarioEntity, 
  UsuarioLogadoEntity
]

let dataSource = new DataSource ({
  type: "postgres",
  url: typeormEnv.url,
  synchronize: false,
  logging: false,
  entities: minhasEntities,
  migrations: minhasMigrations,
});

if (process.env.NODE_ENV == 'test') {
  dataSource = new DataSource ({
    type: "sqlite",
    database: 'database.sqlite3',
    synchronize: false,
    logging: false,
    entities: minhasEntities,
    migrations: minhasMigrations,
  });
};

export default dataSource;