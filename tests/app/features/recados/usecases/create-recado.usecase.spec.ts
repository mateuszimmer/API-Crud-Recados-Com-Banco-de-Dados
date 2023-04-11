import { DatabaseConnection } from '../../../../../src/main/database/typeorm.connections';
import { RedisConnection } from '../../../../../src/main/database/redis.connection';
import { RecadoRepository } from '../../../../../src/app/features/recados/repositories/recado.repository';
import { CriarRecadoUseCase } from '../../../../../src/app/features/recados/usecases/create-recado.usecase';
import { RecadoEntity } from '../../../../../src/app/shared/entities/recado.entity';
import { CacheRepository } from '../../../../../src/app/shared/database/repositories/cache.repository';

beforeAll(async () => {
    await DatabaseConnection.connect();
    await RedisConnection.connect();
});

afterAll(async () => {
    await DatabaseConnection.destroy();
    await RedisConnection.destroy();
});

describe('Criar um recado', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const makeSut = () => {
        const repository = new RecadoRepository();
        const sut = new CriarRecadoUseCase(repository);
        
        return {
            sut,
            repository
        }
    };

    test("Deveria retornar um Recado(model) quando inseridas as informações de titulo, descrição, data e usuario", async () => {
        const { sut } = makeSut()

        jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(null)
        jest.spyOn(CacheRepository.prototype, 'setEX').mockResolvedValue()
        
        jest.spyOn(RecadoRepository.prototype, 'create').mockResolvedValue({
            titulo: "Titulo do Recado",
            descricao: "Descrição do Recado",
            data: "2023-03-15",
            usuario: "teste@teste.com",
            id: '37675579-26d3-4510-adef-1e2730b94785',
            arquivado: false,
            createdAt: new Date('2023-04-03T04:21:12.055Z'),
            updatedAt: null
        } as RecadoEntity)

        const recadoRecebido = {
            id: '',
            titulo: "Titulo do Recado",
            descricao: "Descrição do Recado",
            data: "2023-03-15",
            usuario: "teste@teste.com",
            createdAt: "",
            updatedAt: "",
            arquivado: false,
        }

        const result = await sut.execute(recadoRecebido)

        expect(result).toBeDefined();
        expect(result.id).toBe('37675579-26d3-4510-adef-1e2730b94785');
        expect(result.titulo).toBe('Titulo do Recado');
        expect(result.descricao).toBe('Descrição do Recado');
        expect(result.data).toBe('2023-03-15');
        expect(result.usuario).toBe('teste@teste.com');
        expect(result.arquivado).toBe(false);
    })
});