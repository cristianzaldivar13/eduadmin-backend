import { Body, Controller, Post } from '@nestjs/common';
import { FinanzasService } from './finanzas.service';
import { CreateFinanzaDto } from './dto/create-finanza.dto';
import { UpdateFinanzaDto } from './dto/update-finanza.dto';

@Controller()
export class FinanzasController {
  constructor(private readonly finanzasService: FinanzasService) {}

  @Post('createFinanza')
  create(@Body() createFinanzaDto: CreateFinanzaDto) {
    return this.finanzasService.create(createFinanzaDto);
  }
}
