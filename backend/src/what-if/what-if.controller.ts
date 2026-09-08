import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WhatIfService } from './what-if.service';
import { SimulateDto } from './dto/simulate.dto';

@ApiTags('What-If Simulation')
@Controller('what-if')
export class WhatIfController {
  constructor(private readonly whatIfService: WhatIfService) {}

  @Post('simulate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Simulate counterfactual career outcome given hypothetical skill acquisitions' })
  @ApiResponse({ status: 200, description: 'Computed delta opportunities, salary lift, and unlocked roles' })
  async simulate(@Body() simulateDto: SimulateDto) {
    return this.whatIfService.simulate(simulateDto);
  }
}
