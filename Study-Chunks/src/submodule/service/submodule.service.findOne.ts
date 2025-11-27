import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmoduleEntity } from '../entity/submodule.entity';

@Injectable()
export class SubmoduleServiceFindOne {
  constructor(
    @InjectRepository(SubmoduleEntity)
    private submoduleRepository: Repository<SubmoduleEntity>,
  ) {}

  async findOne(id: number): Promise<SubmoduleEntity> {
    const submodule = await this.submoduleRepository.findOne({
      where: { submoduleId: id },
      relations: ['module'],
    });
    if (!submodule) {
      throw new NotFoundException(`Submódulo com ID ${id} não encontrado.`);
    }
    return submodule;
  }
}
