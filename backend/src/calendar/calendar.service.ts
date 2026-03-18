import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calendario } from './calendario.entity';

@Injectable()
export class CalendarService implements OnModuleInit {
  constructor(
    @InjectRepository(Calendario)
    private calendarioRepository: Repository<Calendario>,
  ) {}

  async onModuleInit() {
    await this.calendarioRepository.clear();
    await this.calendarioRepository.save([
      { dia: 'Lunes', tipo_residuo_id: 1 },
      { dia: 'Martes', tipo_residuo_id: 1 },
      { dia: 'Miércoles', tipo_residuo_id: 2 },
      { dia: 'Jueves', tipo_residuo_id: 4 },
      { dia: 'Viernes', tipo_residuo_id: 3 },
      { dia: 'Sábado', tipo_residuo_id: 9 }
    ]);
  }

  getAll(): Promise<Calendario[]> {
    return this.calendarioRepository.find();
  }
}
