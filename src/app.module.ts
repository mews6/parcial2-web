import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicoController } from './medico/medico.controller';
import { PacienteController } from './paciente/paciente.controller';
import { DiagnosticoController } from './diagnostico/diagnostico.controller';
import { MedicoModule } from './medico/medico.module';
import { PacienteModule } from './paciente/paciente.module';
import { DiagnosticoModule } from './diagnostico/diagnostico.module';
import { MedicoEntity } from './medico/medico.entity';
import { PacienteEntity } from './paciente/paciente.entity';
import { DiagnosticoEntity } from './diagnostico/diagnostico.entity';

@Module({
  imports: [
    MedicoModule,
    PacienteModule,
    DiagnosticoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [
        MedicoEntity,
        PacienteEntity,
        DiagnosticoEntity
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
