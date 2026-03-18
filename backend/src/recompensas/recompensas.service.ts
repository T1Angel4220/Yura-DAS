import { Injectable, OnModuleInit, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recompensa } from './recompensa.entity';
import { Canje } from './canje.entity';
import { User } from '../users/user.entity';

@Injectable()
export class RecompensasService implements OnModuleInit {
  constructor(
    @InjectRepository(Recompensa) private readonly recompRepository: Repository<Recompensa>,
    @InjectRepository(Canje) private readonly canjeRepository: Repository<Canje>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const recompensasIniciales = [
      { nombre: 'Cupón 5% Tienda Local', descripcion: 'Descuento para compras de productos ecoamigables.', puntos_requeridos: 50, imagen_url: 'cupon' },
      { nombre: 'Descuento 15% Comida Sana', descripcion: 'Válido en restaurantes veganos aliados.', puntos_requeridos: 80, imagen_url: 'comida' },
      { nombre: '2x1 Heladería Local', descripcion: 'Invita a alguien un helado artesanal.', puntos_requeridos: 100, imagen_url: 'helado' },
      { nombre: 'Bolsa de Tela Yura PWA', descripcion: 'Reclama gratis una bolsa de compras ecológica.', puntos_requeridos: 150, imagen_url: 'bolsa' },
      { nombre: 'Bono Cuidado Personal', descripcion: 'Descuento del 10% en farmacias aliadas.', puntos_requeridos: 200, imagen_url: 'farmacia' },
      { nombre: 'Descuento 20% Supermercado', descripcion: 'Ahorro exclusivo en frutas y verduras frescas.', puntos_requeridos: 250, imagen_url: 'carrito' },
      { nombre: 'Caja Sorpresa Eco', descripcion: 'Semillas para plantar y compostera casera pequeña.', puntos_requeridos: 300, imagen_url: 'regalo' },
      { nombre: 'Pase Libre: Transporte (1 Sem)', descripcion: 'Viajes gratis en la línea verde del municipio.', puntos_requeridos: 400, imagen_url: 'bus' },
      { nombre: 'Entrada Cine VIP 2D/3D', descripcion: 'Una entrada completamente gratis al cine central.', puntos_requeridos: 500, imagen_url: 'cine' },
      { nombre: 'Acceso Premium Gym (1 Mes)', descripcion: 'Mantente sano con un mes gratis de gimnasio.', puntos_requeridos: 800, imagen_url: 'gym' },
      { nombre: 'Suscripción Streaming (1 Mes)', descripcion: 'Disfruta de Netflix / Spotify equivalente.', puntos_requeridos: 1000, imagen_url: 'tv' }
    ];

    for (const r of recompensasIniciales) {
      const existe = await this.recompRepository.findOne({ where: { nombre: r.nombre } });
      if (!existe) {
        await this.recompRepository.save(r);
      }
    }
  }

  async listarRecompensas() {
    return await this.recompRepository.find({ order: { puntos_requeridos: 'ASC' } });
  }

  async canjear(id_usuario: number, id_recompensa: number) {
    const recomp = await this.recompRepository.findOne({ where: { id: id_recompensa } });
    if (!recomp) throw new BadRequestException('Recompensa inexistente');

    const user = await this.userRepository.findOne({ where: { id_usuario } });
    if (!user) throw new BadRequestException('Usuario no válido');

    if (user.puntos < recomp.puntos_requeridos) {
      throw new BadRequestException('Puntos insuficientes para este canje');
    }

    user.puntos -= recomp.puntos_requeridos;
    await this.userRepository.save(user);

    const canje = this.canjeRepository.create({ id_usuario, id_recompensa });
    await this.canjeRepository.save(canje);

    return { msg: 'Canje exitoso, disfruta tu recompensa.', puntos_restantes: user.puntos };
  }
}
