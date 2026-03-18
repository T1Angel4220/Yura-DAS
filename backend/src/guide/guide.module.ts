import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuideService } from './guide.service';
import { GuideController } from './guide.controller';
import { Residuo } from './residuo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Residuo])],
  controllers: [GuideController],
  providers: [GuideService]
})
export class GuideModule {}
