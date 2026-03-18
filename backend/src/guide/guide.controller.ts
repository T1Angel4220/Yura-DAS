import { Controller, Get } from '@nestjs/common';
import { GuideService } from './guide.service';

@Controller('residuos')
export class GuideController {
  constructor(private readonly guideService: GuideService) {}

  @Get()
  getAll() {
    return this.guideService.getAll();
  }
}
