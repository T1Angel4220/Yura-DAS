import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GuideModule } from './guide/guide.module';
import { CalendarModule } from './calendar/calendar.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Residuo } from './guide/residuo.entity';
import { Calendario } from './calendar/calendario.entity';
import { GamificacionModule } from './gamificacion/gamificacion.module';
import { RecompensasModule } from './recompensas/recompensas.module';
import { HistorialPunto } from './gamificacion/historial-punto.entity';
import { Recompensa } from './recompensas/recompensa.entity';
import { Canje } from './recompensas/canje.entity';
import { LogisticaModule } from './logistica/logistica.module';
import { Ruta } from './logistica/ruta.entity';
import { RutaDetalle } from './logistica/ruta-detalle.entity';
import { Validacion } from './logistica/validacion.entity';
import { RecoleccionAcopio } from './logistica/recoleccion-acopio.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5433,
      username: 'yura_user',
      password: 'yura_password',
      database: 'yura_db',
      entities: [
        User, Residuo, Calendario, 
        HistorialPunto, Recompensa, Canje, 
        Ruta, RutaDetalle, Validacion, RecoleccionAcopio
      ],
      synchronize: true,
    }),
    UsersModule, 
    AuthModule, 
    GuideModule, 
    CalendarModule, 
    GamificacionModule, 
    RecompensasModule, 
    LogisticaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
