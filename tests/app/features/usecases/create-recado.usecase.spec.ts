import { DatabaseConnection } from '../../../../src/main/database/typeorm.connections';
import { RedisConnection } from '../../../../src/main/database/redis.connection';
import { RecadoRepository } from '../../../../src/app/features/recados/repositories/recado.repository';
import { CriarRecadoUseCase } from '../../../../src/app/features/recados/usecases/create-recado.usecase';
import { CacheRepository } from '../../../../src/app/shared/database/repositories/cache.repository';
import { RecadoEntity } from '../../../../src/app/shared/entities/recado.entity';

describe('Crisar um recado', () => {
    beforeAll(async () => {
        await DatabaseConnection.connect();
        await RedisConnection.connect();
        return
    });

    afterAll(async () => {
        await DatabaseConnection.destroy();
        await RedisConnection.disconnect();
        return
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const makeSut = () => {
        const repository = new RecadoRepository();
        const usecase = new CriarRecadoUseCase(repository);

        return {
            sut: usecase,
            repository,
        };
    };

    test('Deveria criar um novo recado', async () => {
        const { sut } = makeSut();

        // Simulação comportamento do Cache
        // jest.spyOn(CacheRepository.prototype, 'del').mockResolvedValue();

        const result = await sut.execute({
            id: '',
            titulo: 'Titulo de teste',
            descricao: 'Descrição de teste do criar recado',
            data: '2023-04-01',
            usuario: 'teste@teste.com',
            arquivado: false
        });

        // Asserts
        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.titulo).toBe('Titulo de teste');
        expect(result.descricao).toBe('Descrição de teste do criar recado');
        expect(result.data).toBe('2023-04-01');
        expect(result.usuario).toBe('teste@teste.com');
        expect(result.arquivado).toBe(false);
    });

});