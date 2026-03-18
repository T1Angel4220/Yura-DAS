import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('historial_puntos')
export class HistorialPunto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ length: 100 })
  accion: string;

  @Column()
  puntos: number;

  @CreateDateColumn({ name: 'fecha' })
  fecha: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id_usuario' })
  usuario: User;
}
