import { RedisConnection } from "../../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../../src/main/database/typeorm.connections";
import { CacheRepository } from "../../../../../src/app/shared/database/repositories/cache.repository"
import { RecadoRepository } from "../../../../../src/app/features/recados/repositories/recado.repository"
import { GetRecadoByUserUseCase } from "../../../../../src/app/features/recados/usecases/get-by-user.usercase"

beforeAll(async () => {
    await DatabaseConnection.connect();
    await RedisConnection.connect();
});

afterAll(async () => {
    await DatabaseConnection.destroy();
    await RedisConnection.destroy()
});

describe("Teste Get-by-user usecase", () => {
    // Simulação do BD
    jest.spyOn(RecadoRepository.prototype, 'getByUser').mockResolvedValue([
        {
            id: "id01",
            titulo: "Recado 1",
            descricao: "Descricao 1",
            data: "2023-03-15T03:00:00.000Z",
            usuario: "teste@teste.com",
            arquivado: false,
            createdAt: new Date("2023-04-02T04:32:38.054Z"),
            updatedAt: null
        } as any,
        {
            id: "id02",
            titulo: "Recado 2",
            descricao: "Descricao 2",
            data: "2023-03-15T03:00:00.000Z",
            usuario: "teste@teste.com",
            arquivado: false,
            createdAt: new Date("2023-04-02T04:32:38.054Z"),
            updatedAt: null
        } as any,
        {
            id: "id020",
            titulo: "Recado 20",
            descricao: "Descricao 20",
            data: "2023-03-15T03:00:00.000Z",
            usuario: "teste@teste.com",
            arquivado: true,
            createdAt: new Date("2023-04-02T04:32:38.054Z"),
            updatedAt: null
        } as any
    ])

    beforeEach(() => {
        jest.clearAllMocks()
    })


    test('Deve retornar os recados do usuário vindos do BD', async () => {
        jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(false);
        jest.spyOn(CacheRepository.prototype, 'setEX').mockResolvedValue();

        const repository = new RecadoRepository()
        const usecase = new GetRecadoByUserUseCase(repository)

        const resposta = await usecase.execute('teste@teste')

        expect(resposta).toHaveLength(3)
        expect(resposta[0]).toHaveProperty('id', 'id01')
        expect(resposta[1]).toHaveProperty('id', 'id02')
        expect(resposta[2]).toHaveProperty('id', 'id020')
    })

    test('Deve retornar os recados do usuário vindos do BD filtrados pelo titulo', async () => {
        jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(false);
        jest.spyOn(CacheRepository.prototype, 'setEX').mockResolvedValue();

        const repository = new RecadoRepository()
        const usecase = new GetRecadoByUserUseCase(repository)

        const resposta = await usecase.execute('teste@teste', 'Recado 2')

        expect(resposta).toHaveLength(2)
        expect(resposta[0]).toHaveProperty('id', 'id02')
        expect(resposta[0]).toHaveProperty('titulo', 'Recado 2')
        expect(resposta[1]).toHaveProperty('id', 'id020')
        expect(resposta[1]).toHaveProperty('titulo', 'Recado 20')
    })

    test('Deve retornar os recados do usuário vindos do BD filtrados pelo titulo e não arquivados', async () => {
        jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(false);
        jest.spyOn(CacheRepository.prototype, 'setEX').mockResolvedValue();

        const repository = new RecadoRepository()
        const usecase = new GetRecadoByUserUseCase(repository)

        const resposta = await usecase.execute('teste@teste', 'Recado 2', false)

        expect(resposta).toHaveLength(1)
        expect(resposta[0]).toHaveProperty('id', 'id02')
        expect(resposta[0]).toHaveProperty('titulo', 'Recado 2')
    })

    test('Deve retornar os recados do usuário vindos do BD filtrados pelo titulo e arquivados', async () => {
        jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(false);
        jest.spyOn(CacheRepository.prototype, 'setEX').mockResolvedValue();

        const repository = new RecadoRepository()
        const usecase = new GetRecadoByUserUseCase(repository)

        const resposta = await usecase.execute('teste@teste', 'Recado 2', true)

        expect(resposta).toHaveLength(1)
        expect(resposta[0]).toHaveProperty('id', 'id020')
        expect(resposta[0]).toHaveProperty('titulo', 'Recado 20')
    })
    
});