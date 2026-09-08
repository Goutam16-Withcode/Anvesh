import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SimulateDto {
  @ApiProperty({ example: ['Kubernetes', 'Go', 'MLflow'], description: 'Hypothetical skills to add to profile' })
  @IsArray()
  @IsString({ each: true })
  add_skills: string[];

  @ApiProperty({ example: 'REMOTE', required: false, description: 'Target work mode filter' })
  @IsOptional()
  @IsString()
  target_location?: string;
}
