import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecompensasController } from './recompensas.controller';
import { RecompensasService } from './recompensas.service';
import { Recompensa } from './recompensa.entity';
import { Canje } from './canje.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recompensa, Canje, User])],
  controllers: [RecompensasController],
  providers: [RecompensasService],
})
export class RecompensasModule {}
