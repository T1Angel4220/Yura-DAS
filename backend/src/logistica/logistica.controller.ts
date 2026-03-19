import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LogisticaService } from './logistica.service';

@Controller('logistica')
export class LogisticaController {
  constructor(private readonly logService: LogisticaService) {}

  @Get('rutas')
  getRutas() {
    return this.logService.getRutas();
  }

  @Post('rutas')
  createRuta(@Body() data: { nombre: string; zona: string }) {
    return this.logService.createRuta(data);
  }

  @Get('usuarios-ruta/:id')
  getUsuariosRuta(@Param('id') id: string) {
    return this.logService.getUsuariosRuta(parseInt(id, 10));
  }

  @Post('validacion/campo')
  validarEnCampo(
    @Body('id_conductor') id_conductor: number,
    @Body('id_usuario') id_usuario: number,
    @Body('estado') estado: string
  ) {
    return this.logService.validarEnCampo(id_conductor, id_usuario, estado);
  }
}
