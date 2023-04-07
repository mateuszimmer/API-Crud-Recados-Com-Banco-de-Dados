import { RecadoRepository } from "../../../../../src/app/features/recados/repositories/recado.repository";
import { RedisConnection } from "../../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../../src/main/database/typeorm.connections";
import { DeletarRecadoUseCase } from '../../../../../src/app/features/recados/usecases/delete-recado.usecase';
import { CacheRepository } from "../../../../../src/app/shared/database/repositories/cache.repository";

beforeAll(async () => {
    await DatabaseConnection.connect();
    await RedisConnection.connect();
});

afterAll(async () => {
    await DatabaseConnection.destroy();
    await RedisConnection.destroy();
});

describe('Testes DeletarRecadoUseCase', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });


    const makeSut = () => {
        const repository = new RecadoRepository();
        const sut = new DeletarRecadoUseCase(repository);
        
        return {
            sut,
            repository
        }
    };

    test('Deve chamar o método Delete do Repository com os parâmtros corretos', async () => {
        const { sut, repository } = makeSut();
        const id = "id-existente";
        const usuario = "id-válido";
        
        jest.spyOn(RecadoRepository.prototype, 'delete').mockResolvedValue();
        jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(null)
        jest.spyOn(CacheRepository.prototype, 'setEX').mockResolvedValue()

        await sut.execute(id, usuario)

        expect(repository.delete).toHaveBeenCalledTimes(1)
        expect(repository.delete).toHaveBeenCalledWith(id, usuario)
    })

    test('Deve retornar a resposta da exclusão { raw: [], affected: 0 } se o recado não for localizado', async () => {
        const idInvalido = "id-não-existente";
        const usuario = "id-válido";
        const { sut } = makeSut();

        jest.spyOn(RecadoRepository.prototype, 'delete').mockResolvedValue({ raw: [], affected: 0 });
        jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(null)
        jest.spyOn(CacheRepository.prototype, 'setEX').mockResolvedValue()

        const resposta = await sut.execute(idInvalido, usuario)

        expect(resposta?.affected).toBe(0)        
    })

    test('Deve retornar a resposta da exclusão { raw: [], affected: 1 } se o recado for localizado e deletado', async () => {
        const id = "id-existente";
        const usuario = "id-válido";
        const { sut } = makeSut();
    
        jest.spyOn(RecadoRepository.prototype, 'delete').mockResolvedValue({ raw: [], affected: 1 })
        jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(null)
        jest.spyOn(CacheRepository.prototype, 'setEX').mockResolvedValue()

        const resposta = await sut.execute(id, usuario)

        expect(resposta?.affected).toBe(1)        
    })

});


