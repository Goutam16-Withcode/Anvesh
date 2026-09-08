import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecommendationsService } from './recommendations.service';

@ApiTags('Recommendations')
@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Get('feed')
  @ApiOperation({ summary: 'Get personalized multi-stage job recommendations (Hybrid + LTR + MMR)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of recommendations' })
  @ApiQuery({ name: 'work_mode', required: false, type: String, description: 'Filter by REMOTE / HYBRID / ONSITE' })
  @ApiQuery({ name: 'diversity_factor', required: false, type: Number, description: 'MMR lambda diversity weight (0.0 - 1.0)' })
  @ApiResponse({ status: 200, description: 'Multi-stage recommendation feed with scoring breakdowns' })
  async getFeed(
    @Query('limit') limit?: number,
    @Query('work_mode') workMode?: string,
    @Query('diversity_factor') diversityFactor?: number,
  ) {
    return this.recommendationsService.getRecommendations({
      limit: limit ? Number(limit) : 20,
      work_mode: workMode,
      diversity_factor: diversityFactor ? Number(diversityFactor) : 0.35,
    });
  }
}
