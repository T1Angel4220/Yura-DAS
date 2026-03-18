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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5433,
      username: 'yura_user',
      password: 'yura_password',
      database: 'yura_db',
      entities: [User, Residuo, Calendario],
      synchronize: true, // Auto-create tables for Hito 3
    }),
    UsersModule, 
    AuthModule, 
    GuideModule, 
    CalendarModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
