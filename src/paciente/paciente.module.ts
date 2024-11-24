import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteEntity } from './paciente.entity';
import { PacienteService } from './paciente.service';
import { MedicoEntity } from 'src/medico/medico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteEntity]), TypeOrmModule.forFeature([MedicoEntity])],
  providers: [PacienteService],
})
export class PacienteModule {}