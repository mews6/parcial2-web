import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicoEntity } from './medico.entity';

import { BusinessError, 
    BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class MedicoService {
    constructor(
        @InjectRepository(MedicoEntity)
        private readonly medicoRepository: Repository<MedicoEntity>
    ) {}

    async findAll(): Promise<MedicoEntity[]> {
        return await this.medicoRepository.find({relations: ['paciente']})
    }

    async findOne(id: number): Promise<MedicoEntity> {
        const medico: MedicoEntity = await this.medicoRepository.findOne({
            where: { id },
            relations: ['paciente']
        }); 
        if(!medico) {
            throw new BusinessLogicException(
                'The medic with that given id was not found',
                BusinessError.NOT_FOUND
            )
        }
        return medico
    } 

    async create(medico: MedicoEntity): Promise<MedicoEntity> {
        return await this.medicoRepository.save(medico);
    } 

    async delete(id: number) {
        const medico: MedicoEntity = await this.medicoRepository.findOne({where: { id }});
        if (!medico)
            throw new BusinessLogicException(
            'The medic with that given id was not found',
            BusinessError.NOT_FOUND
        ); 
        await this.medicoRepository.remove(medico);
    }
}