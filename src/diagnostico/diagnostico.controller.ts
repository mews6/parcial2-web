import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UseInterceptors,
  } from '@nestjs/common';
import { DiagnosticoService } from './diagnostico.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { DiagnosticoEntity } from './diagnostico.entity';
import { plainToInstance } from 'class-transformer';
import { DiagnosticoDto } from './diagnostico.dto';

@Controller('diagnostico')
@UseInterceptors(BusinessErrorsInterceptor)
export class DiagnosticoController {
    constructor(private readonly diagnosticoService: DiagnosticoService) {}

    @Get()
    async findAll() {
        return await this.diagnosticoService.findAll();
    }

    @Get(':diagnosticoId')
    async findOne(@Param('diagnosticoId') diagnosticoId: number) {
      return await this.diagnosticoService.findOne(diagnosticoId);
    }
    @Post()
    async create(@Body() diagnosticoDto: DiagnosticoDto) {
      const diagnostico: DiagnosticoEntity = plainToInstance(DiagnosticoEntity, diagnosticoDto);
      return await this.diagnosticoService.create(diagnostico);
    }

    @Delete(':medicoId')
    @HttpCode(204)
    async delete(@Param('medicoId') medicoId: number) {
      return await this.diagnosticoService.delete(medicoId);
    }
}
