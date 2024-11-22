import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    OneToMany,
  } from 'typeorm';
import { PacienteEntity } from 'src/paciente/paciente.entity';

@Entity()
export class DiagnosticoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @ManyToMany(() => PacienteEntity, (paciente) => paciente.diagnosticos, {nullable: true})
    pacientes: PacienteEntity[]

}