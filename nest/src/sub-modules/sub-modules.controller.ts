import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubModulesService } from './sub-modules.service';
import { CreateSubModuleDto } from './dto/create-sub-module.dto';
import { UpdateSubModuleDto } from './dto/update-sub-module.dto';

@Controller('sub-modules')
export class SubModulesController {
  constructor(private readonly subModulesService: SubModulesService) {}

  @Post()
  create(@Body() createSubModuleDto: CreateSubModuleDto) {
    return this.subModulesService.create(createSubModuleDto);
  }

  @Get()
  findAll() {
    return this.subModulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subModulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubModuleDto: UpdateSubModuleDto) {
    return this.subModulesService.update(+id, updateSubModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subModulesService.remove(+id);
  }
}
