import { RecadoEntity } from '../../../../../src/app/shared/entities/recado.entity'
import { RecadoRepository } from "../../../../../src/app/features/recados/repositories/recado.repository";
import { UpdateRecadoUsecase } from "../../../../../src/app/features/recados/usecases/update-recado-usecase";
import { RedisConnection } from "../../../../../src/main/database/redis.connection";
import { DatabaseConnection } from "../../../../../src/main/database/typeorm.connections";


describe('Testes recado.repository', () => {
    
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
    });

    const makeSut = () => {
        const sut = new RecadoRepository
        return sut
    }

    test('Create - Deve retornar o novo recado com as informações que foram passadas', async () => {

        jest.spyOn(RecadoEntity.prototype, 'save').mockResolvedValue(
            {
                id: 'id01',
                titulo: "Titulo do Recado",
                descricao: "Descrição do Recado",
                data: "2023-03-15",
                usuario: "teste@teste.com",
                createdAt: new Date("2023-04-03T04:21:12.055Z"),
                updatedAt: "",
                arquivado: false,
            } as any
        );

        const  sut = makeSut()
        const result = await sut.create({
            titulo: "Titulo do Recado",
            descricao: "Descrição do Recado",
            data: "2023-03-15",
            usuario: "teste@teste.com",
        } as any)

        expect(result).toBeDefined()
        expect(result).toHaveProperty('id')
        expect(result.titulo).toBe('Titulo do Recado')
        expect(result.descricao).toBe('Descrição do Recado')
        expect(result.data).toBe('2023-03-15')
        expect(result.usuario).toBe('teste@teste.com')
    });

    test('GetById - Deve retornar o recado localizado conforme as informações passadas', async () => {
        jest.spyOn(RecadoEntity, 'findOne').mockResolvedValue(
            {
                id: 'id01',
                titulo: "Titulo do Recado",
                descricao: "Descrição do Recado",
                data: "2023-03-15",
                usuario: "teste@teste.com",
                createdAt: new Date("2023-04-03T04:21:12.055Z"),
                updatedAt: "",
                arquivado: false,
            } as any
        );

        const sut = makeSut()

        const result = await sut.getById('id01');

        expect(result).toBeDefined()
        expect(result).toHaveProperty('id')
        expect(result!.titulo).toBe('Titulo do Recado')
        expect(result!.descricao).toBe('Descrição do Recado')
        expect(result!.data).toBe('2023-03-15')
        expect(result!.usuario).toBe('teste@teste.com')
    });

    test('GetByUser - Deve retornar lista de recados conforme usuario informado', async () => {
        jest.spyOn(RecadoEntity, 'find').mockResolvedValue([
            {
                id: 'id01',
                titulo: "Titulo do Recado",
                descricao: "Descrição do Recado",
                data: "2023-03-15",
                usuario: "teste@teste.com",
                createdAt: new Date("2023-04-03T04:21:12.055Z"),
                updatedAt: "",
                arquivado: false,
            } as any,
            {
                id: 'id02',
                titulo: "Titulo do Recado 2",
                descricao: "Descrição do Recado 2",
                data: "2023-03-15",
                usuario: "teste@teste.com",
                createdAt: new Date("2023-04-03T04:21:12.055Z"),
                updatedAt: "",
                arquivado: false,
            } as any
        ]);

        const sut = makeSut()

        const result = await sut.getByUser('teste@teste.com');

        expect(result).toBeDefined()
        expect(result).toHaveLength(2)
        expect(result[0]).toHaveProperty('id')
        expect(result[0].titulo).toBe('Titulo do Recado')
        expect(result[0].descricao).toBe('Descrição do Recado')
        expect(result[0].data).toBe('2023-03-15')
        expect(result[0].usuario).toBe('teste@teste.com')
    })

    describe('update', () => {

        let repository: RecadoRepository;

        beforeEach(() => {
            repository = new RecadoRepository();
        });

        it('deve chamar RecadoEntity.findOne com os argumentos corretos', async () => {
          // Arrange
          const novoRecado = { id: 'recadoId', usuario: 'usuario', titulo: 'Novo Título' };
          const getByIdSpy = jest.spyOn(repository, 'getById').mockResolvedValue(new RecadoEntity()); // Simula o retorno de getById com uma instância válida de RecadoEntity
          const recadoSaveSpy = jest.spyOn(RecadoEntity.prototype, 'save').mockResolvedValue(new RecadoEntity()); // Simula o retorno de save com uma instância válida de RecadoEntity
    
          // Act
          await repository.update(novoRecado);
    
          // Assert
          expect(getByIdSpy).toHaveBeenCalledWith(novoRecado.id, novoRecado.usuario);
        });
    
        it('deve atualizar os campos corretamente e retornar o resultado de save', async () => {
          // Arrange
          const novoRecado = { id: 'recadoId', usuario: 'usuario', titulo: 'Novo Título' };
          const recadoExistente = new RecadoEntity(); // Simula o retorno de getById com uma instância válida de RecadoEntity
          jest.spyOn(repository, 'getById').mockResolvedValue(recadoExistente);
          const recadoSaveSpy = jest.spyOn(RecadoEntity.prototype, 'save').mockResolvedValue(recadoExistente);
    
          // Act
          const resultado = await repository.update(novoRecado);
    
          // Assert
          expect(recadoExistente.titulo).toEqual(novoRecado.titulo);
          expect(recadoSaveSpy).toHaveBeenCalled();
          expect(resultado).toEqual(recadoExistente);
        });
    
        it('deve retornar null se o recado não existir', async () => {
          // Arrange
          const novoRecado = { id: 'recadoId', usuario: 'usuario', titulo: 'Novo Título' };
          jest.spyOn(repository, 'getById').mockResolvedValue(null); // Simula o retorno de getById com null
    
          // Act
          const resultado = await repository.update(novoRecado);
    
          // Assert
          expect(resultado).toBeNull();
        });
      });
    
    describe('delete', () => {
        jest.spyOn(RecadoEntity, 'delete').mockResolvedValue({ raw: [], affected: 1 })

        test('Deve retornar as informações de recado deletado', async () => {
            const sut = makeSut();

            const result = await sut.delete('id', 'usuario')

            expect(result).toBeDefined()
            expect(result).toHaveProperty('affected')
            expect(result!.affected).toBe(1)
        })
    })
});