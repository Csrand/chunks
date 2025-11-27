import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmoduleEntity } from '../entity/submodule.entity';

@Injectable()
export class SubmoduleServiceDelete {
  constructor(
    @InjectRepository(SubmoduleEntity)
    private submoduleRepository: Repository<SubmoduleEntity>,
  ) {}

  async remove(id: number): Promise<void> {
    const result = await this.submoduleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Submódulo com ID ${id} não encontrado.`);
    }
  }
}
