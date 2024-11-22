import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiagnosticoEntity } from './diagnostico.entity';

import { BusinessError, 
    BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class DiagnosticoService {
    constructor(
        @InjectRepository(DiagnosticoEntity)
        private readonly diagnosticoRepository: Repository<DiagnosticoEntity>
    ) {}


    async findAll(): Promise<DiagnosticoEntity[]> {
        return await this.diagnosticoRepository.find({relations: ['paciente']})
    }
    
    async findOne(id: number): Promise<DiagnosticoEntity> {
        const diagnostico: DiagnosticoEntity = await this.diagnosticoRepository.findOne({
            where: { id },
            relations: ['paciente']
        }); 
        if(!diagnostico) {
            throw new BusinessLogicException(
                'The diagnostic with that given id was not found',
                BusinessError.NOT_FOUND
            )
        }
        return diagnostico
    } 
    
    async create(paciente: DiagnosticoEntity): Promise<DiagnosticoEntity> {
        return await this.diagnosticoRepository.save(paciente);
    } 
    
    async delete(id: number) {
        const diagnostico: DiagnosticoEntity = await this.diagnosticoRepository.findOne({where: { id }});
        if (!diagnostico)
        throw new BusinessLogicException(
            'The diagnostic with that given id was not found',
            BusinessError.NOT_FOUND
        ); 
        await this.diagnosticoRepository.remove(diagnostico);
    }

}