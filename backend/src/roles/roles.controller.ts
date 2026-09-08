import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';

@ApiTags('Roles & Career Discovery')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get('discover')
  @ApiOperation({ summary: 'Discover matching career roles from skill graph ontology' })
  @ApiQuery({ name: 'skills', required: false, description: 'Comma separated skills (e.g. Python,PyTorch)' })
  @ApiResponse({ status: 200, description: 'List of discovered roles with affinity scores and gap skills' })
  async discoverRoles(@Query('skills') skills?: string) {
    const parsedSkills = skills ? skills.split(',').map((s) => s.trim()) : ['Python', 'PyTorch', 'FastAPI'];
    const discovered = await this.rolesService.discoverRoles(parsedSkills);
    return {
      discovered_roles: discovered,
      total: discovered.length,
      query_skills: parsedSkills,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get full role taxonomy ontology' })
  async getAll() {
    return this.rolesService.getAllRoles();
  }
}
