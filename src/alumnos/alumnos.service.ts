import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';

@Injectable()
export class AlumnosService {
  private alumnos: Alumno[] = [];

  create(createAlumnoDto: CreateAlumnoDto) {
    const newAlumno: Alumno = {
      nombres: createAlumnoDto.nombres,
      apellidos: createAlumnoDto.apellidos,
      matricula: createAlumnoDto.matricula,
      promedio: createAlumnoDto.promedio,
      id: createAlumnoDto.id || Math.floor(Math.random() * 1000000),
    };
    this.alumnos.push(newAlumno);
    return newAlumno;
  }

  findAll() {
    return this.alumnos;
  }

  findOne(id: string) {
    const numericId = parseInt(id, 10);
    const alumno = this.alumnos.find((a) => a.id === numericId);
    if (!alumno) {
      throw new NotFoundException(`Alumno con id ${id} no encontrado`);
    }
    return alumno;
  }

  update(id: string, updateAlumnoDto: UpdateAlumnoDto) {
    const alumno = this.findOne(id);
    const numericId = parseInt(id, 10);
    const index = this.alumnos.findIndex((a) => a.id === numericId);

    const alumnoActualizado = { ...alumno, ...updateAlumnoDto };
    this.alumnos[index] = alumnoActualizado;

    return alumnoActualizado;
  }

  remove(id: string) {
    const alumno = this.findOne(id);
    const numericId = parseInt(id, 10);
    this.alumnos = this.alumnos.filter((a) => a.id !== numericId);
  }
}
