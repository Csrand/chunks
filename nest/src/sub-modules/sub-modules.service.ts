import { Injectable } from '@nestjs/common';
import { CreateSubModuleDto } from './dto/create-sub-module.dto';
import { UpdateSubModuleDto } from './dto/update-sub-module.dto';

@Injectable()
export class SubModulesService {
  create(createSubModuleDto: CreateSubModuleDto) {
    return 'This action adds a new subModule';
  }

  findAll() {
    return `This action returns all subModules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subModule`;
  }

  update(id: number, updateSubModuleDto: UpdateSubModuleDto) {
    return `This action updates a #${id} subModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} subModule`;
  }
}
