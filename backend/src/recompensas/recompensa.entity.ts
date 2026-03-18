import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recompensas')
export class Recompensa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column({ name: 'puntos_requeridos' })
  puntos_requeridos: number;

  @Column({ name: 'imagen_url', nullable: true })
  imagen_url: string;
}
