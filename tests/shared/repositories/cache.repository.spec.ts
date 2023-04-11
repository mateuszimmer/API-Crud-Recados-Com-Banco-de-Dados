import { CacheRepository } from "../../../src/app/shared/database/repositories/cache.repository";
import { RedisConnection } from "../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../src/main/database/typeorm.connections";


describe('Teste cache.repository.ts', () =>{
    beforeAll(async () => {
        await DatabaseConnection.connect();
        await RedisConnection.connect();
    });
    
    afterAll(async () => {
        await DatabaseConnection.destroy();
        await RedisConnection.destroy();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    })

    const makeSut = () => {
        return new CacheRepository()
    }

    test('Deveria retornar um recado com o id informado', async () => {
        const recadoTeste = {
            id: 'id01',
            titulo: "Titulo do Recado",
            descricao: "Descrição do Recado",
            data: "2023-03-15",
            usuario: "teste@teste.com",
            createdAt: new Date("2023-04-03T04:21:12.055Z"),
            updatedAt: "",
            arquivado: false,
        }
        
        jest.spyOn(RedisConnection.connection, 'get').mockResolvedValue(JSON.stringify(recadoTeste))

        const sut = makeSut()

        const result = await sut.get('id01')

        expect(result).toBeDefined()
        expect(result.id).toBe('id01')
        expect(result.titulo).toBeDefined()
        
    })

    test('Deveria retornar null caso não seja localizado', async () => {
        jest.spyOn(RedisConnection.connection, 'get').mockResolvedValue(null)

        const sut = makeSut()

        const result = await sut.get('id01')

        expect(result).toBeNull()
    })

    test('Deveria chamar o redis.set com as informações corretas', async () => {
        const recadoTeste = {
            id: 'id01',
            titulo: "Titulo do Recado",
            descricao: "Descrição do Recado",
            data: "2023-03-15",
            usuario: "teste@teste.com",
            createdAt: new Date("2023-04-03T04:21:12.055Z"),
            updatedAt: "",
            arquivado: false,
        }
        
        const setSpy = jest.spyOn(RedisConnection.connection, 'set').mockResolvedValue('')

        const sut = makeSut()
        await sut.set(recadoTeste.id, recadoTeste)

        expect(setSpy).toBeCalledTimes(1)
        expect(setSpy).toBeCalledWith(recadoTeste.id, JSON.stringify(recadoTeste))
    })

    test('Deveria chamar o redis.set com as informações corretas, uma vez que foi chamado o setEX', async () => {
        const recadoTeste = {
            id: 'id01',
            titulo: "Titulo do Recado",
            descricao: "Descrição do Recado",
            data: "2023-03-15",
            usuario: "teste@teste.com",
            createdAt: new Date("2023-04-03T04:21:12.055Z"),
            updatedAt: "",
            arquivado: false,
        }
        
        const setSpy = jest.spyOn(RedisConnection.connection, 'set').mockResolvedValue('')

        const sut = makeSut()
        await sut.setEX(recadoTeste.id, recadoTeste, 15)

        expect(setSpy).toBeCalledTimes(1)
        expect(setSpy).toBeCalledWith(recadoTeste.id, JSON.stringify(recadoTeste), 'EX', 15)
    })

})