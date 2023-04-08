import { RecadoRepository } from "../../../../../src/app/features/recados/repositories/recado.repository";
import { UpdateRecadoUsecase } from "../../../../../src/app/features/recados/usecases/update-recado-usecase";
import { CacheRepository } from "../../../../../src/app/shared/database/repositories/cache.repository";
import { RecadoEntity } from "../../../../../src/app/shared/entities/recado.entity";
import { RedisConnection } from "../../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../../src/main/database/typeorm.connections";

describe("Testes update-recado.usecase", () => {
    beforeAll(async () => {
        await DatabaseConnection.connect();
        await RedisConnection.connect();
    });
    
    afterAll(async () => {
        await DatabaseConnection.destroy();
        await RedisConnection.destroy();
    });

    const makeSut = () => {
        const repository = new RecadoRepository();
        const sut = new UpdateRecadoUsecase(repository);
        return { repository, sut }
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Deveria retornar nulo por não localizar recado para atualizar", async () => {
        jest.spyOn(RecadoRepository.prototype, 'getById').mockResolvedValue(null)

        const { sut } = makeSut();

        const resposta = await sut.execute('id-invalido', {
            titulo: "Recado inválido",
            descricao: "Descricao recado iniválido",
            data: "2023-03-15T03:00:00.000Z",
            arquivado: false,
        })

        expect(resposta).toBeNull()
    })

    test('Deve retornar o recado atualizado', async () => {
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
        );

        jest.spyOn(RecadoRepository.prototype, 'update').mockResolvedValue(
            {
                id: "id01",
                titulo: "Recado 01 Alterado",
                descricao: "Descricao recado 01 Alterada",
                data: "2023-03-15T03:00:00.000Z",
                usuario: "teste@teste.com",
                arquivado: false,
                createdAt: new Date("2023-04-02T04:32:38.054Z"),
                updatedAt: null
            } as any
        )

        jest.spyOn(CacheRepository.prototype, 'setEX').mockResolvedValue()
        jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue([
            {
                id: "id00",
                titulo: "Recado 0",
                descricao: "Descricao 0",
                data: "2023-03-15T03:00:00.000Z",
                usuario: "teste@teste.com",
                arquivado: false,
                createdAt: new Date("2023-04-02T04:32:38.054Z"),
                updatedAt: null
            },
            {
                id: "id01",
                titulo: "Recado 1",
                descricao: "Descricao 1",
                data: "2023-03-15T03:00:00.000Z",
                usuario: "teste@teste.com",
                arquivado: false,
                createdAt: new Date("2023-04-02T04:32:38.054Z"),
                updatedAt: null
            },
        ])

        const { sut } = makeSut();

        const resposta = await sut.execute('id01', {
            titulo: "Recado 01 Alterado",
            descricao: "Descricao recado 01 Alterada",
            data: "2023-03-15T03:00:00.000Z",
            arquivado: false,
        })

        expect(resposta).toBeDefined();
        expect(resposta!.id).toBe('id01');
        expect(resposta!.titulo).toBe('Recado 01 Alterado');
        expect(resposta!.descricao).toBe('Descricao recado 01 Alterada');
    });

});

// jest.spyOn(RecadoRepository.prototype, 'update').mockResolvedValue(            {
//     id: "id01",
//     titulo: "Recado 1",
//     descricao: "Descricao 1",
//     data: "2023-03-15T03:00:00.000Z",
//     usuario: "teste@teste.com",
//     arquivado: false,
//     createdAt: new Date("2023-04-02T04:32:38.054Z"),
//     updatedAt: null
// } as any,
// )