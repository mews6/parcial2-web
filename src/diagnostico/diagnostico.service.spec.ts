import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiagnosticoEntity } from './diagnostico.entity';
import { DiagnosticoService } from './diagnostico.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { faker } from '@faker-js/faker';

describe('PacienteService', () => {
    let service: DiagnosticoService;
    let repository: Repository<DiagnosticoEntity>;
    let diagnosticoList: DiagnosticoEntity[];


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        imports: [...TypeOrmTestingConfig()],
        providers: [DiagnosticoService],
        }).compile();

        service = module.get<DiagnosticoService>(DiagnosticoService);
        repository = module.get<Repository<DiagnosticoEntity>>(
            getRepositoryToken(DiagnosticoEntity),
        );
        await seedDatabase();
    });
    
    const seedDatabase = async () => {
        await repository.clear();
        diagnosticoList = [];
        for (let i = 0; i < 5; i++) {
          const medico: DiagnosticoEntity = await repository.save({
            nombre: faker.person.fullName(),
            descripcion: faker.person.jobTitle(),
            pacientes: null
          });
          diagnosticoList.push(medico);
        }
    };


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a new entity',() => {
    const new_diagnostico_id: number = diagnosticoList.length + 1
    const paciente: DiagnosticoEntity = {
        id: new_diagnostico_id,
        nombre: faker.person.fullName(),
        descripcion: faker.person.jobTitle(),
        pacientes: null
    }

    expect(() => service.create(paciente))
  });

  it('should be able to return all diagnostics', async () => {
    const diagnosticos: DiagnosticoEntity[] = await service.findAll();
    expect(diagnosticos).not.toBeNull();
    expect(diagnosticos).toHaveLength(diagnosticoList.length);
  });

  it('should be able to return a patient by id', async () => {
    const storedDiagnostic: DiagnosticoEntity = diagnosticoList[0]
    const diagnostico: DiagnosticoEntity = await service.findOne(storedDiagnostic.id)

    expect(diagnostico).not.toBeNull();

    expect(diagnostico.id).toEqual(storedDiagnostic.id);
    expect(diagnostico.nombre).toEqual(storedDiagnostic.nombre);
    expect(diagnostico.descripcion).toEqual(storedDiagnostic.descripcion);
  })

})