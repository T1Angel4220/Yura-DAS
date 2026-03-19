import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rutas')
export class Ruta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nombre: string;

  @Column({ length: 100, nullable: true })
  zona: string;
}
