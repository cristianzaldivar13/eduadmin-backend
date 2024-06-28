import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './dto/jwt.constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { ValidateRolesGuard } from './validate-roles.guard';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    UsuariosModule,
    RolesModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, ValidateRolesGuard],
  controllers: [AuthController],
})
export class AuthModule {}
