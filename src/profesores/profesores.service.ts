import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfesoreDto } from './dto/create-profesore.dto';
import { UpdateProfesoreDto } from './dto/update-profesore.dto';
import { Profesor } from './entities/profesore.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProfesoresService {
  private profesores: Profesor[] = [];

  create(createProfesoreDto: CreateProfesoreDto) {
    const newProfesor: Profesor = {
      id: uuidv4(),
      ...createProfesoreDto,
    };
    this.profesores.push(newProfesor);
    return newProfesor;
  }

  findAll() {
    return this.profesores;
  }

  findOne(id: string) {
    const profesor = this.profesores.find((p) => p.id === id);
    if (!profesor) {
      throw new NotFoundException(`Profesor con id ${id} no encontrado`);
    }
    return profesor;
  }

  update(id: string, updateProfesoreDto: UpdateProfesoreDto) {
    const profesor = this.findOne(id);
    const index = this.profesores.findIndex((p) => p.id === id);

    const profesorActualizado = { ...profesor, ...updateProfesoreDto };
    this.profesores[index] = profesorActualizado;

    return profesorActualizado;
  }

  remove(id: string) {
    const profesor = this.findOne(id);
    this.profesores = this.profesores.filter((p) => p.id !== id);
  }
}
