import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamificacionController } from './gamificacion.controller';
import { GamificacionService } from './gamificacion.service';
import { HistorialPunto } from './historial-punto.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialPunto, User])],
  controllers: [GamificacionController],
  providers: [GamificacionService],
  exports: [GamificacionService]
})
export class GamificacionModule {}
