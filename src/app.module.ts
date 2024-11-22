import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AggaController } from './agga/agga.controller';
import { MedicoController } from './medico/medico.controller';
import { PacienteController } from './paciente/paciente.controller';
import { DiagnosticoController } from './diagnostico/diagnostico.controller';

@Module({
  imports: [],
  controllers: [AppController, AggaController, MedicoController, PacienteController, DiagnosticoController],
  providers: [AppService],
})
export class AppModule {}
