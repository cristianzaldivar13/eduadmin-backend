import { IsNumber, IsObject, IsOptional } from 'class-validator';

export class PaginacionDto {
  @IsOptional()
  @IsNumber()
  limit?: number; // Número máximo de resultados a devolver

  @IsOptional()
  @IsNumber()
  skip?: number; // Número de resultados a omitir (paginación)

  @IsOptional()
  @IsObject()
  sort?: Record<string, 1 | -1>; // 1 para ascendente, -1 para descendente

  @IsOptional()
  filtros?: Record<string, any>; // Filtros opcionales, genéricos
}
