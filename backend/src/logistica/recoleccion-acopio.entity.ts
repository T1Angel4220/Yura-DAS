import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ruta } from './ruta.entity';

@Entity('recoleccion_acopio')
export class RecoleccionAcopio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_ruta' })
  id_ruta: number;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @CreateDateColumn({ name: 'fecha' })
  fecha: Date;

  @ManyToOne(() => Ruta)
  @JoinColumn({ name: 'id_ruta' })
  ruta: Ruta;
}
