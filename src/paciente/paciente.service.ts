import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacienteEntity } from './paciente.entity';

import { BusinessError, 
    BusinessLogicException } from 'src/shared/errors/business-errors';


@Injectable()
export class MedicoService {
    constructor(
        @InjectRepository(PacienteEntity)
        private readonly pacienteRepository: Repository<PacienteEntity>
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
}