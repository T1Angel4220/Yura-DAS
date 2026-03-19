import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ruta } from './ruta.entity';
import { Residuo } from '../guide/residuo.entity';

@Entity('ruta_detalle')
export class RutaDetalle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_ruta' })
  id_ruta: number;

  @Column({ length: 50 })
  dia: string;

  @Column({ name: 'tipo_residuo_id' })
  tipo_residuo_id: number;

  @ManyToOne(() => Ruta)
  @JoinColumn({ name: 'id_ruta' })
  ruta: Ruta;

  @ManyToOne(() => Residuo)
  @JoinColumn({ name: 'tipo_residuo_id' })
  residuo: Residuo;
}
