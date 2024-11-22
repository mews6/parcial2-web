import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacienteEntity } from './paciente.entity';

import { BusinessError, 
    BusinessLogicException } from 'src/shared/errors/business-errors';
import { MedicoEntity } from 'src/medico/medico.entity';
import { MedicoService } from 'src/medico/medico.service';

@Injectable()
export class PacienteService {
    constructor(
        @InjectRepository(PacienteEntity)
        private readonly pacienteRepository: Repository<PacienteEntity>,

        @InjectRepository(MedicoEntity)
        private readonly medicoRepository: Repository<MedicoEntity>

    ) {}
    
    async findAll(): Promise<PacienteEntity[]> {
        return await this.pacienteRepository.find({relations: ['medico','diagnostico']})
    }
    
    async findOne(id: number): Promise<PacienteEntity> {
        const paciente: PacienteEntity = await this.pacienteRepository.findOne({
            where: { id },
            relations: ['medico','diagnostico']
        }); 
        if(!paciente) {
            throw new BusinessLogicException(
                'The patient with that given id was not found',
                BusinessError.NOT_FOUND
            )
        }
        return paciente
    } 
    
    async create(paciente: PacienteEntity): Promise<PacienteEntity> {
        return await this.pacienteRepository.save(paciente);
    } 
    
    async delete(id: number) {
        const paciente: PacienteEntity = await this.pacienteRepository.findOne({where: { id }});
        if (!paciente)
        throw new BusinessLogicException(
            'The patient with that given id was not found',
            BusinessError.NOT_FOUND
        ); 
        await this.pacienteRepository.remove(paciente);
    }

    async addMedicoToPaciente(pacienteId: number, medicoId:number){
        const paciente: PacienteEntity = await this.pacienteRepository.findOne({where: { id:pacienteId }});
        const medico: MedicoEntity = await this.medicoRepository.findOne({where: { id:medicoId }});

        if (!paciente)
            throw new BusinessLogicException(
                'The patient with that given id was not found',
                BusinessError.NOT_FOUND
            ); 
        if (!medico)
            throw new BusinessLogicException(
                'The medic with that given id was not found',
                BusinessError.NOT_FOUND
            ); 
        if (paciente.medicos.length >= 5)
            throw new BusinessLogicException(
            'The current patient has reached the maximum number of possible medics.',
            BusinessError.PRECONDITION_FAILED
        )

        paciente.medicos.push(medico);
    }
}