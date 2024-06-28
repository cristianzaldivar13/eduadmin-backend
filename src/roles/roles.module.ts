import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Roles } from './models/roles.model';
import { RolesSchema } from './schemas/rol.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Roles.name, schema: RolesSchema }]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService], 
})
export class RolesModule {}
