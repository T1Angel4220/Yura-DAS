import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('calendario_recoleccion')
export class Calendario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'dia', length: 20 })
  dia: string;

  @Column({ name: 'tipo_residuo_id' })
  tipo_residuo_id: number;
}
