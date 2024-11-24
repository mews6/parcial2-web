import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { plainToInstance } from 'class-transformer';
import { PacienteDto } from './paciente.dto';
import { PacienteEntity } from './paciente.entity';

@Controller('paciente')
export class PacienteController {
    constructor(private readonly pacienteService: PacienteService) {}
    
    @Get()
    async findAll() {
        return await this.pacienteService.findAll();
    }

    @Get(':medicoId')
    async findOne(@Param('medicoId') medicoId: number) {
      return await this.pacienteService.findOne(medicoId);
    }
    
    @Post()
    async addMedicoToPaciente(@Param() pacienteId:number, medicoId:number){
        return await this.pacienteService.addMedicoToPaciente(pacienteId, medicoId)
    }

    @Post()
    async create(@Body() pacienteDto: PacienteDto) {
      const paciente: PacienteEntity = plainToInstance(PacienteEntity, pacienteDto);
      return await this.pacienteService.create(paciente);
    }

    @Delete(':pacienteId')
    @HttpCode(204)
    async delete(@Param('pacienteId') pacienteId: number) {
      return await this.pacienteService.delete(pacienteId);
    }
}
