import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Profile & Candidate Intelligence')
@Controller('profile')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile and verified skill ontology' })
  @ApiResponse({ status: 200, description: 'Candidate profile data' })
  async getMyProfile(@Request() req) {
    return this.usersService.getProfile(req.user.email);
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update candidate profile preferences and skills' })
  async updateProfile(@Request() req, @Body() body: any) {
    return this.usersService.updateProfile(req.user.email, body);
  }
}
