import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { WhatIfModule } from './what-if/what-if.module';
import { AgentModule } from './agent/agent.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    RecommendationsModule,
    WhatIfModule,
    AgentModule,
    HealthModule,
  ],
})
export class AppModule {}
