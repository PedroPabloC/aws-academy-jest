import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';

@Injectable()
export class ProfesoresService {
  private profesores: Profesor[] = [];

  create(createProfesorDto: CreateProfesorDto) {
    const newProfesor: Profesor = {
      id: createProfesorDto.id || Math.floor(Math.random() * 1000000),
      nombres: createProfesorDto.nombres,
      apellidos: createProfesorDto.apellidos,
      numeroEmpleado: createProfesorDto.numeroEmpleado,
      horasClase: createProfesorDto.horasClase,
    };
    this.profesores.push(newProfesor);
    return newProfesor;
  }

  findAll() {
    return this.profesores;
  }

  findOne(id: string) {
    const numericId = parseInt(id, 10);
    const profesor = this.profesores.find((p) => p.id === numericId);
    if (!profesor) {
      throw new NotFoundException(`Profesor con id ${id} no encontrado`);
    }
    return profesor;
  }

  update(id: string, updateProfesorDto: UpdateProfesorDto) {
    const numericId = parseInt(id, 10);
    const profesor = this.findOne(id);
    const index = this.profesores.findIndex((p) => p.id === numericId);
    const profesorActualizado = { ...profesor, ...updateProfesorDto };
    this.profesores[index] = profesorActualizado;
    return profesorActualizado;
  }

  remove(id: string) {
    const numericId = parseInt(id, 10);
    const profesor = this.findOne(id);
    this.profesores = this.profesores.filter((p) => p.id !== numericId);
  }
}
