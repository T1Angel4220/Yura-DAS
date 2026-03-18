import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { Calendario } from './calendario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calendario])],
  controllers: [CalendarController],
  providers: [CalendarService]
})
export class CalendarModule {}
