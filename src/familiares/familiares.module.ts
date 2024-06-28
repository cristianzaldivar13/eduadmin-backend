import { Module } from '@nestjs/common';
import { FamiliaresService } from './familiares.service';
import { FamiliaresController } from './familiares.controller';

@Module({
  controllers: [FamiliaresController],
  providers: [FamiliaresService],
})
export class FamiliaresModule {}
