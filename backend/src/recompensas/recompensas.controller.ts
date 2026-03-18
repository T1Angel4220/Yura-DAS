import { Controller, Get, Post, Body } from '@nestjs/common';
import { RecompensasService } from './recompensas.service';

@Controller('recompensas')
export class RecompensasController {
  constructor(private readonly recService: RecompensasService) {}

  @Get()
  getRecompensas() {
    return this.recService.listarRecompensas();
  }

  @Post('canjear')
  canjearRecompensa(@Body('id_usuario') id_usuario: number, @Body('id_recompensa') id_recompensa: number) {
    return this.recService.canjear(id_usuario, id_recompensa);
  }
}
