import { Test, TestingModule } from '@nestjs/testing';
import { SubModulesController } from './sub-modules.controller';
import { SubModulesService } from './sub-modules.service';

describe('SubModulesController', () => {
  let controller: SubModulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubModulesController],
      providers: [SubModulesService],
    }).compile();

    controller = module.get<SubModulesController>(SubModulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
