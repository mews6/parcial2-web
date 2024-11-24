import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { MedicoDto } from './medico.dto';
import { MedicoEntity } from './medico.entity';
import { plainToInstance } from 'class-transformer';

@Controller('medico')
export class MedicoController {
    constructor(private readonly medicoService: MedicoService) {}

    @Get()
    async findAll() {
        return await this.medicoService.findAll();
    }

    @Get(':medicoId')
    async findOne(@Param('medicoId') medicoId: number) {
      return await this.medicoService.findOne(medicoId);
    }
    @Post()
    async create(@Body() medicoDto: MedicoDto) {
      const medico: MedicoEntity = plainToInstance(MedicoEntity, medicoDto);
      return await this.medicoService.create(medico);
    }

    @Delete(':medicoId')
    @HttpCode(204)
    async delete(@Param('medicoId') medicoId: number) {
      return await this.medicoService.delete(medicoId);
    }
}
