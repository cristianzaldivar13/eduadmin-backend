import { Body, Controller, Post } from '@nestjs/common';
import { FinanzasService } from './finanzas.service';
import { CreateFinanzaDto } from './dto/crear-finanza.dto';
import { UpdateFinanzaDto } from './dto/actualizar-finanza.dto';
import { ApiTags } from '@nestjs/swagger';
import { EnumSecciones } from '../utils/enums/secciones.enum';

@ApiTags(EnumSecciones.FINANZAS)
@Controller(EnumSecciones.FINANZAS)
export class FinanzasController {
  constructor(private readonly finanzasService: FinanzasService) {}

  @Post('createFinanza')
  create(@Body() createFinanzaDto: CreateFinanzaDto) {
    return this.finanzasService.create(createFinanzaDto);
  }
}
