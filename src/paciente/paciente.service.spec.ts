import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacienteEntity } from './paciente.entity';
import { PacienteService } from './paciente.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { faker } from '@faker-js/faker';

describe('PacienteService', () => {
    let service: PacienteService;
    let repository: Repository<PacienteEntity>;
    let pacienteList: PacienteEntity[];


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        imports: [...TypeOrmTestingConfig()],
        providers: [PacienteService],
        }).compile();

        service = module.get<PacienteService>(PacienteService);
        repository = module.get<Repository<PacienteEntity>>(
            getRepositoryToken(PacienteEntity),
        );
        await seedDatabase();
    });
    
    const seedDatabase = async () => {
        await repository.clear();
        pacienteList = [];
        for (let i = 0; i < 5; i++) {
          const paciente: PacienteEntity = await repository.save({
            nombre: faker.person.fullName(),
            genero: faker.person.gender(),
            medicos: null,
            diagnosticos: null
          });
          pacienteList.push(paciente);
        }
    };


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a new entity',() => {
    const new_paciente_id: number = pacienteList.length + 1
    const paciente: PacienteEntity = {
        id: new_paciente_id,
        nombre: faker.person.fullName(),
        genero: faker.person.gender(),
        medicos: null,
        diagnosticos: null
    }

    expect(() => service.create(paciente))
  });

  it('should reject invalid names',() => {
    const new_paciente_id: number = pacienteList.length + 1
    const paciente: PacienteEntity = {
        id: new_paciente_id,
        nombre: 'an',
        genero: faker.person.gender(),
        medicos: null,
        diagnosticos: null
    }

    expect(() => service.create(paciente)).rejects.toHaveProperty(
        'message',
        'The name of this patient is too short'
    )
  });

  it('should be able to return all patients', async () => {
    const pacientes: PacienteEntity[] = await service.findAll();
    expect(pacientes).not.toBeNull();
    expect(pacientes).toHaveLength(pacienteList.length);
  });

  it('should be able to return a patient by id', async () => {
    const storedPatient: PacienteEntity = pacienteList[0]
    const patient: PacienteEntity = await service.findOne(storedPatient.id)

    expect(patient).not.toBeNull();

    expect(patient.id).toEqual(storedPatient.id);
    expect(patient.nombre).toEqual(storedPatient.nombre);
    expect(patient.genero).toEqual(storedPatient.genero)
  })

})