import { Injectable } from '@nestjs/common';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';

@Injectable()
export class DisciplineService {
  create(createDisciplineDto: CreateDisciplineDto) {
    return 'This action adds a new discipline';
  }

  findAll() {
    return `This action returns all discipline`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discipline`;
  }

  update(id: number, updateDisciplineDto: UpdateDisciplineDto) {
    return `This action updates a #${id} discipline`;
  }

  remove(id: number) {
    return `This action removes a #${id} discipline`;
  }
}
