import { PacienteEntity } from '../paciente/paciente.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    ManyToMany,
  } from 'typeorm';

@Entity()
export class MedicoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    especialidad: string;

    @Column()
    telefono: string;

    @ManyToMany(() => PacienteEntity, (paciente) => paciente.medicos, {nullable: true})
    pacientes: PacienteEntity[]

}