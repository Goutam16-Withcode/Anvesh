import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.APP_SECRET_KEY || 'anvesh-dev-secret-key-jwt-2026',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthService, JwtStrategy],
  exports: [AuthService, FirebaseAuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
