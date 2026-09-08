import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChatDto {
  @ApiProperty({ example: 'Which high-paying roles fit me if I already know Python and PyTorch?' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ example: 'sess_123', required: false })
  @IsOptional()
  @IsString()
  session_id?: string;
}
