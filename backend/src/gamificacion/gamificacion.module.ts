import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamificacionService } from './gamificacion.service';
import { GamificacionController } from './gamificacion.controller';
import { HistorialPunto } from './historial-punto.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistorialPunto, User])
  ],
  providers: [GamificacionService],
  controllers: [GamificacionController],
  exports: [GamificacionService]
})
export class GamificacionModule {}
