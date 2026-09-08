import { Module } from '@nestjs/common';
import { WhatIfController } from './what-if.controller';
import { WhatIfService } from './what-if.service';

@Module({
  controllers: [WhatIfController],
  providers: [WhatIfService],
  exports: [WhatIfService],
})
export class WhatIfModule {}
