import { RecadoRepository } from "../../../../../src/app/features/recados/repositories/recado.repository";
import { CacheRepository } from "../../../../../src/app/shared/database/repositories/cache.repository";
import { GetRecadoByIdUseCase } from "../../../../../src/app/features/recados/usecases/get-recado-id.usecase";
import { RedisConnection } from "../../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../../src/main/database/typeorm.connections";


describe('Teste get-recado-id.usecase', () => {
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
        jest.spyOn(RecadoRepository.prototype, 'getById').mockResolvedValue(            {
                id: "id01",
                titulo: "Recado 1",
                descricao: "Descricao 1",
                data: "2023-03-15T03:00:00.000Z",
                usuario: "teste@teste.com",
                arquivado: false,
                createdAt: new Date("2023-04-02T04:32:38.054Z"),
                updatedAt: null
            } as any,
        )

    });

    

    const makeSut = () => {
        const repository = new RecadoRepository()
        const sut = new GetRecadoByIdUseCase(repository);

        return { repository, sut }
    }

    test('Deve retornar recado conforme o id', async () => {
        jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(null);
        jest.spyOn(CacheRepository.prototype, 'set').mockResolvedValue();
        jest.spyOn(CacheRepository.prototype, 'setEX').mockResolvedValue();

        const { sut } = makeSut()

        const resposta = await sut.execute('id01')

        expect(resposta).toBeDefined()
        expect(resposta.id).toBe('id01')
        expect(resposta.titulo).toBe('Recado 1')
        expect(resposta.descricao).toBe('Descricao 1')
        expect(resposta.data).toBe('2023-03-15T03:00:00.000Z')
        expect(resposta.usuario).toBe('teste@teste.com')
        expect(resposta.arquivado).toBe(false)

    });

    test('Deve retornar recado conforme o id, mas buscando do cache', async () => {
        jest.clearAllMocks()
        
        jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValueOnce({
            id: "id01",
            titulo: "Recado 1",
            descricao: "Descricao 1",
            data: "2023-03-15T03:00:00.000Z",
            usuario: "teste@teste.com",
            arquivado: false,
            createdAt: new Date("2023-04-02T04:32:38.054Z"),
            updatedAt: null
        } as any,)
        jest.spyOn(CacheRepository.prototype, 'set').mockResolvedValue();
        jest.spyOn(CacheRepository.prototype, 'setEX').mockResolvedValue();
        jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(null)

        const { sut } = makeSut()

        const resposta = await sut.execute('id01')

        expect(resposta).toBeDefined()
        expect(resposta.id).toBe('id01')
        expect(resposta.titulo).toBe('Recado 1')
        expect(resposta.descricao).toBe('Descricao 1')
        expect(resposta.data).toBe('2023-03-15T03:00:00.000Z')
        expect(resposta.usuario).toBe('teste@teste.com')
        expect(resposta.arquivado).toBe(false)

    });

    test('Deve salvar o recado na lista de recados', async () => {
        jest.clearAllMocks()
        
        jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValueOnce(null)
        jest.spyOn(CacheRepository.prototype, 'set').mockResolvedValue();
        jest.spyOn(CacheRepository.prototype, 'setEX').mockResolvedValue();

        jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue([
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
        
        jest.spyOn(RecadoRepository.prototype, 'getById').mockResolvedValue({
            id: "id01",
            titulo: "Recado 1",
            descricao: "Descricao 1",
            data: "2023-03-15T03:00:00.000Z",
            usuario: "teste@teste.com",
            arquivado: false,
            createdAt: new Date("2023-04-02T04:32:38.054Z"),
            updatedAt: null
        } as any,)
        

        const { sut } = makeSut()

        const resposta = await sut.execute('id01')

        expect(resposta).toBeDefined()
        expect(resposta.id).toBe('id01')
        expect(resposta.titulo).toBe('Recado 1')
        expect(resposta.descricao).toBe('Descricao 1')
        expect(resposta.data).toBe('2023-03-15T03:00:00.000Z')
        expect(resposta.usuario).toBe('teste@teste.com')
        expect(resposta.arquivado).toBe(false)

    });
})