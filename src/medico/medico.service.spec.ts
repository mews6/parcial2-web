import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicoEntity } from './medico.entity';
import { MedicoService } from './medico.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { faker } from '@faker-js/faker';

describe('PacienteService', () => {
    let service: MedicoService;
    let repository: Repository<MedicoEntity>;
    let medicoList: MedicoEntity[];


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        imports: [...TypeOrmTestingConfig()],
        providers: [MedicoService],
        }).compile();

        service = module.get<MedicoService>(MedicoService);
        repository = module.get<Repository<MedicoEntity>>(
            getRepositoryToken(MedicoEntity),
        );
        await seedDatabase();
    });
    
    const seedDatabase = async () => {
        await repository.clear();
        medicoList = [];
        for (let i = 0; i < 5; i++) {
          const medico: MedicoEntity = await repository.save({
            nombre: faker.person.fullName(),
            especialidad: faker.person.jobTitle(),
            telefono: faker.phone.number(),
            pacientes: null
          });
          medicoList.push(medico);
        }
    };


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a new entity',() => {
    const new_paciente_id: number = medicoList.length + 1
    const paciente: MedicoEntity = {
        id: new_paciente_id,
        nombre: faker.person.fullName(),
        especialidad: faker.person.jobTitle(),
        telefono: faker.phone.number(),
        pacientes: null
    }

    expect(() => service.create(paciente))
  });

  it('should be able to return all medics', async () => {
    const medicos: MedicoEntity[] = await service.findAll();
    expect(medicos).not.toBeNull();
    expect(medicos).toHaveLength(medicoList.length);
  });

  it('should be able to return a patient by id', async () => {
    const storedMedic: MedicoEntity = medicoList[0]
    const medico: MedicoEntity = await service.findOne(storedMedic.id)

    expect(medico).not.toBeNull();

    expect(medico.id).toEqual(storedMedic.id);
    expect(medico.nombre).toEqual(storedMedic.nombre);
    expect(medico.especialidad).toEqual(storedMedic.especialidad);
  })

})