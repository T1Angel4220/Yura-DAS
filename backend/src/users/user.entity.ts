import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id_usuario: number;

  @Column({ name: 'nombre', length: 100 })
  nombre: string;

  @Column({ name: 'email', length: 100, unique: true })
  email: string;

  @Column({ name: 'password', length: 255 })
  password: string;

  @Column({ name: 'puntos', default: 0 })
  puntos: number;

  @Column({ name: 'rol', length: 20, default: 'ciudadano' })
  rol: string;
}
