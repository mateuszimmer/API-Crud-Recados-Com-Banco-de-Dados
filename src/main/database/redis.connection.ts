import Redis from "ioredis";
import { redisEnv } from "../../app/envs/redis.env";

export class RedisConnection {
  private static _connection: Redis;

  public static async connect(): Promise<void> {
    if (!this._connection)  {
      this._connection = new Redis({
        host: redisEnv.host,
        port: redisEnv.port,
        username: redisEnv.username,
        password: redisEnv.password,
      })
    }
  }

  public static get connection() {
    if (!this._connection) {
      throw new Error("Redis nao conectado :/");
    }
    return this._connection;
  }

  public static async destroy() {
      if (!this._connection) {
        throw new Error("Redis não conectado")
      }

      try {
        this._connection.quit();
      } catch {
        throw new Error("Não foi possível encerrar a conexão")
      }
  }
}
