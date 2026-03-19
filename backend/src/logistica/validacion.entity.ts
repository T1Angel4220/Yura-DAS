import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('validaciones_campo')
export class Validacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ name: 'id_conductor' })
  id_conductor: number;

  @Column({ type: 'enum', enum: ['correcto', 'incorrecto'] })
  estado: string;

  @CreateDateColumn({ name: 'fecha' })
  fecha: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id_usuario' })
  ciudadano: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_conductor', referencedColumnName: 'id_usuario' })
  conductor: User;
}
