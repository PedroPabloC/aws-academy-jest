import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateProfesoreDto {
  @IsString()
  @IsNotEmpty()
  numeroEmpleado: string;

  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @IsNumber()
  @Min(0)
  @Max(168)
  horasClase: number;
}
