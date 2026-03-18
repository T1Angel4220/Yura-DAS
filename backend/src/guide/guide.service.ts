import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Residuo } from './residuo.entity';

@Injectable()
export class GuideService implements OnModuleInit {
  constructor(
    @InjectRepository(Residuo)
    private residuoRepository: Repository<Residuo>,
  ) {}

  async onModuleInit() {
    await this.residuoRepository.clear(); // Clear to re-seed with richer data
    await this.residuoRepository.save([
      { id_tipo: 1, nombre: 'Papel y Cartón', descripcion: 'Limpio y seco. NO papel higiénico ni servilletas sucias.', ejemplos: 'Cajas de zapatos,Cajas de cereal,Cajas de pizza (sin grasa),Periódicos,Revistas,Cuadernos viejos,Hojas impresas,Folletos,Sobres de papel,Tubos de papel higiénico,Cubetas de huevo' },
      { id_tipo: 2, nombre: 'Plástico', descripcion: 'Enjuagados y aplastados para ahorrar espacio.', ejemplos: 'Botellas de agua,Botellas de refresco,Envases de yogur,Tarrinas de comida (limpias),Tapas plásticas,Fundas de supermercado,Envases de champú,Envases de detergente,Tarrinas de helado' },
      { id_tipo: 3, nombre: 'Vidrio', descripcion: 'Infinitamente reciclable. Sin tapas ni corchos.', ejemplos: 'Frascos de mermelada,Frascos de mayonesa,Botellas de vino,Botellas de cerveza,Envases de perfume,Vasos rotos (envueltos en papel),Frascos de café' },
      { id_tipo: 4, nombre: 'Orgánico', descripcion: 'Restos de comida que pueden hacerse abono.', ejemplos: 'Cáscaras de plátano,Cáscaras de cítricos,Restos de lechuga,Restos de zanahoria,Posos de café,Bolsitas de té,Hojas secas,Cáscaras de huevo,Restos de tomate,Restos de cebolla' },
      { id_tipo: 5, nombre: 'Tetra Pak', descripcion: 'Enjuagar, desdoblar pestañas y aplastar.', ejemplos: 'Cajas de leche líquida,Cajas de jugo,Envases de puré de tomate,Envases de crema de leche,Envases de vino en caja' },
      { id_tipo: 6, nombre: 'Pilas y Baterías', descripcion: 'ALTA TOXICIDAD. Llevar a puntos especiales.', ejemplos: 'Pilas AA/AAA (control remoto),Pilas de reloj,Baterías de celular infladas,Baterías de laptop viejas,Baterías recargables dañadas' },
      { id_tipo: 7, nombre: 'Electrónicos', descripcion: 'No van a la basura común. Tienen metales pesados.', ejemplos: 'Cables USB rotos,Cargadores viejos,Celulares dañados,Audífonos rotos,Teclados inservibles,Mouses dañados,Planchas quemadas,Partes de computadora' },
      { id_tipo: 8, nombre: 'Aceite Usado', descripcion: 'Nunca al lavabo. Tapa en una botella plástica.', ejemplos: 'Aceite de freír papas,Grasa sobrante de sartén,Aceite de conservas (ej. de atún)' },
      { id_tipo: 9, nombre: 'Basura Común (No Reciclable)', descripcion: 'Residuos que no pueden ser recuperados. Van directo al relleno sanitario.', ejemplos: 'Pañales,Papel higiénico usado,Toallas sanitarias,Mascarillas sanitarias,Barrido de la casa,Restos de cerámica rota,Cintas adhesivas,Esponjas de lavar platos,Colillas de cigarro,Excremento de mascotas,Chicles,Fotografías,Papel carbón,Tíquets de compra,Envolturas de snacks (papas/galletas),Espejos rotos,Tubos de pasta dental' }
    ]);
  }

  getAll(): Promise<Residuo[]> {
    return this.residuoRepository.find();
  }
}
