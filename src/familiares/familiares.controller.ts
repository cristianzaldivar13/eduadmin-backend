import { Body, Controller, Post } from '@nestjs/common';
import { FamiliaresService } from './familiares.service';
import { CreateFamiliareDto } from './dto/create-familiare.dto';

@Controller()
export class FamiliaresController {
  constructor(private readonly familiaresService: FamiliaresService) {}

  @Post('createFamiliare')
  create(@Body() createFamiliareDto: CreateFamiliareDto) {
    return this.familiaresService.create(createFamiliareDto);
  }
}
