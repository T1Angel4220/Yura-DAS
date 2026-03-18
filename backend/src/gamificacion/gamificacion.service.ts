import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThan } from 'typeorm';
import { User } from '../users/user.entity';
import { HistorialPunto } from './historial-punto.entity';

@Injectable()
export class GamificacionService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(HistorialPunto) private readonly historialRepository: Repository<HistorialPunto>,
  ) {}

  async obtenerPerfil(id_usuario: number) {
    const user = await this.userRepository.findOne({ where: { id_usuario } });
    if (!user) throw new BadRequestException('Usuario no encontrado');

    // Calc nivel
    let nivel = 'Novato';
    let p_min = 0, p_max = 50;
    
    if (user.puntos >= 51 && user.puntos <= 150) {
      nivel = 'Reciclador';
      p_min = 51; p_max = 150;
    } else if (user.puntos > 150) {
      nivel = 'Experto';
      p_min = 151; p_max = 9999;
    }

    const progreso = user.puntos > 150 ? 100 : Math.floor(((user.puntos - p_min) / (p_max - p_min)) * 100);

    return {
      nombre: user.nombre,
      puntos: user.puntos,
      nivel,
      progreso_porcentaje: progreso,
      siguiente_meta: p_max
    };
  }

  async sumarPuntos(id_usuario: number, accion: string) {
    // Basic anti-spam: Only allow same action once per day
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const manana = new Date(hoy);
    manana.setDate(manana.getDate() + 1);

    const exist = await this.historialRepository.findOne({
      where: {
        id_usuario,
        accion,
        fecha: Between(hoy, manana)
      }
    });

    if (exist) {
      return { msg: 'Ya sumaste puntos por esta acción hoy', added: false };
    }

    let puntos_agregados = 5;
    if (accion === 'RECICLAR') puntos_agregados = 20;

    // Guardar historial
    const reg = this.historialRepository.create({ id_usuario, accion, puntos: puntos_agregados });
    await this.historialRepository.save(reg);

    // Actualizar usuario
    await this.userRepository.increment({ id_usuario }, 'puntos', puntos_agregados);

    return { msg: 'Puntos sumados correctamente!', added: true, points: puntos_agregados };
  }

  async obtenerRankingConUsuario(id_usuario: number) {
    const top10 = await this.userRepository.find({
      select: ['id_usuario', 'nombre', 'puntos'],
      order: { puntos: 'DESC' },
      take: 10
    });

    const user = await this.userRepository.findOne({ where: { id_usuario } });
    if (!user) return { top10, userRank: null };

    const superiorCount = await this.userRepository.count({
      where: { puntos: MoreThan(user.puntos) }
    });

    return { 
      top10, 
      userRank: { 
        posicion: superiorCount + 1, 
        nombre: user.nombre, 
        puntos: user.puntos 
      } 
    };
  }
}
