import { DiagnosticoEntity } from 'src/diagnostico/diagnostico.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    ManyToOne,
    OneToMany,
  } from 'typeorm';

@Entity()
export class PacienteEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    genero: string;

    @ManyToMany(() => DiagnosticoEntity, (diagnostico) => diagnostico.pacientes, {nullable: true})
    diagnosticos: DiagnosticoEntity[]
}