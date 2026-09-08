import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'goutam@example.com', description: 'User email address' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({ example: 'SecurePass123!', description: 'User password (min 6 chars)' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({ example: 'Goutam Anvesh', description: 'Full name' })
  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  full_name: string;

  @ApiProperty({ example: 'candidate', description: 'User role type', required: false })
  @IsOptional()
  @IsString()
  role_type?: string = 'candidate';
}
