import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ruta } from './ruta.entity';
import { Validacion } from './validacion.entity';
import { User } from '../users/user.entity';
import { GamificacionService } from '../gamificacion/gamificacion.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LogisticaService implements OnModuleInit {
  constructor(
    @InjectRepository(Ruta) private readonly rutaRepository: Repository<Ruta>,
    @InjectRepository(Validacion) private readonly validacionRepository: Repository<Validacion>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly gamificacionService: GamificacionService
  ) {}

  async onModuleInit() {
    const c = await this.rutaRepository.count();
    if (c === 0) {
      await this.rutaRepository.save([
        { nombre: 'Ruta 1', zona: 'Norte' },
        { nombre: 'Ruta 2', zona: 'Sur' },
      ]);
    }
    
    // Generar el hash correctamente para poder iniciar sesion
    const passHash = await bcrypt.hash('123', 10);

    const cond = await this.userRepository.findOne({ where: { email: 'conductor@yura.com' } });
    if (!cond) {
      const u = this.userRepository.create({ nombre: 'Juan Recolector', email: 'conductor@yura.com', password: passHash, rol: 'conductor' });
      await this.userRepository.save(u);
    } else if (cond.password === '123') {
      // Repara la contraseña si se quedó guardada en texto plano en el primer intento
      cond.password = passHash;
      await this.userRepository.save(cond);
    }
    
    const adm = await this.userRepository.findOne({ where: { email: 'admin@yura.com' } });
    if (!adm) {
      const a = this.userRepository.create({ nombre: 'Admin Yura', email: 'admin@yura.com', password: passHash, rol: 'admin' });
      await this.userRepository.save(a);
    } else if (adm.password === '123') {
      adm.password = passHash;
      await this.userRepository.save(adm);
    }
  }

  async getRutas() {
    return await this.rutaRepository.find();
  }

  async createRuta(data: { nombre: string; zona: string }) {
    const nr = this.rutaRepository.create(data);
    return await this.rutaRepository.save(nr);
  }

  async getUsuariosRuta(rutaId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const usuarios = await this.userRepository.find({ where: { rol: 'ciudadano' } });
    
    // Anexar estado de validación de hoy
    const result = [];
    for (const u of usuarios) {
      const v = await this.validacionRepository.createQueryBuilder('v')
        .where('v.id_usuario = :userId', { userId: u.id_usuario })
        .andWhere('v.fecha >= :today', { today })
        .getOne();
        
      result.push({
        ...u,
        evaluadoHoy: !!v,
        resultadoHoy: v ? v.estado : null
      });
    }
    
    return result;
  }

  async validarEnCampo(id_conductor: number, id_usuario: number, estado: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existe = await this.validacionRepository.createQueryBuilder('v')
      .where('v.id_usuario = :userId', { userId: id_usuario })
      .andWhere('v.fecha >= :today', { today })
      .getOne();

    if (existe) {
      return { msg: 'Este vecino ya fue evaluado el día de hoy.', error: true };
    }

    // Registrar la auditoria/validacion
    const val = this.validacionRepository.create({ id_conductor, id_usuario, estado });
    await this.validacionRepository.save(val);

    // Conectar automáticamente con el Hito 4 de GAMIFICACIÓN
    if (estado === 'correcto') {
      // Sumar 20 puntos por reciclaje verificado
      await this.gamificacionService.sumarPuntos(id_usuario, 'RECICLAR');
      return { msg: 'Validación exitosa. Se asignaron 20 Yura-Puntos al ciudadano.', puntos_dados: 20 };
    }

    return { msg: 'Material no cumplió norma. No se asignaron puntos.', puntos_dados: 0 };
  }

  async getValidacionHoy(id_usuario: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const v = await this.validacionRepository.createQueryBuilder('v')
      .where('v.id_usuario = :userId', { userId: id_usuario })
      .andWhere('v.fecha >= :today', { today })
      .getOne();
      
    if (v) return v;
    return { estado: 'pendiente' };
  }
}
