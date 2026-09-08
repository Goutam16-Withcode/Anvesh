import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health & Telemetry')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Backend service health check' })
  @ApiResponse({ status: 200, description: 'System operational status' })
  check() {
    return {
      status: 'UP',
      app: 'ANVESH Career Intelligence Platform',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      services: {
        api_gateway: 'ONLINE',
        auth_service: 'ONLINE',
        recommendation_engine: 'ONLINE',
        what_if_simulation: 'ONLINE',
        career_agent: 'ONLINE',
      },
    };
  }
}
