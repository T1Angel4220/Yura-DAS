import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Recompensa } from './recompensa.entity';

@Entity('canjes')
export class Canje {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ name: 'id_recompensa' })
  id_recompensa: number;

  @CreateDateColumn({ name: 'fecha' })
  fecha: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id_usuario' })
  usuario: User;

  @ManyToOne(() => Recompensa)
  @JoinColumn({ name: 'id_recompensa' })
  recompensa: Recompensa;
}
