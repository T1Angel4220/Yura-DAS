import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogisticaController } from './logistica.controller';
import { LogisticaService } from './logistica.service';
import { Ruta } from './ruta.entity';
import { RutaDetalle } from './ruta-detalle.entity';
import { Validacion } from './validacion.entity';
import { RecoleccionAcopio } from './recoleccion-acopio.entity';
import { User } from '../users/user.entity';
import { GamificacionModule } from '../gamificacion/gamificacion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ruta, RutaDetalle, Validacion, RecoleccionAcopio, User]),
    GamificacionModule
  ],
  controllers: [LogisticaController],
  providers: [LogisticaService]
})
export class LogisticaModule {}
