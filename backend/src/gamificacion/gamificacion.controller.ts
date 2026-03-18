import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GamificacionService } from './gamificacion.service';

@Controller('gamificacion')
export class GamificacionController {
  constructor(private readonly gamifService: GamificacionService) {}

  @Get('perfil/:id')
  getPerfil(@Param('id') id: string) {
    return this.gamifService.obtenerPerfil(parseInt(id, 10));
  }

  @Post('sumar')
  sumarPuntos(@Body('id_usuario') id_usuario: number, @Body('accion') accion: string) {
    return this.gamifService.sumarPuntos(id_usuario, accion);
  }

  @Get('ranking/:id')
  getRanking(@Param('id') id: string) {
    return this.gamifService.obtenerRankingConUsuario(parseInt(id, 10));
  }
}
