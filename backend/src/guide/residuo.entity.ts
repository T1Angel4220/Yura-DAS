import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('tipos_residuos')
export class Residuo {
  @PrimaryColumn({ name: 'id_tipo' })
  id_tipo: number;

  @Column({ name: 'nombre', length: 50 })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text' })
  descripcion: string;

  @Column({ name: 'ejemplos', type: 'text', nullable: true })
  ejemplos: string;
}
