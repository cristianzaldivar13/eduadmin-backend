// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './dto/jwt.constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { RolesModule } from '../roles/roles.module';
import { JwtAuthGuard } from './guardians/jwt-auth.guard';
import { ValidaRolGuard } from './guardians/valida-rol.guard';
import { ValidaIdDocumentoGuard } from './guardians/valida-Id-documento.guard';
import { ValidarIdsDocumentosGuard } from './guardians/validar-ids-documentos-guard';

@Module({
  imports: [
    UsuariosModule,
    RolesModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, ValidaRolGuard, ValidaIdDocumentoGuard, ValidarIdsDocumentosGuard, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
