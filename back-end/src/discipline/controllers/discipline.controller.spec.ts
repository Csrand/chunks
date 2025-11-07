import { Test, TestingModule } from '@nestjs/testing';
import { DisciplineController } from './discipline.controller';
import { DisciplineService } from './discipline.service';

describe('DisciplineController', () => {
  let controller: DisciplineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisciplineController],
      providers: [DisciplineService],
    }).compile();

    controller = module.get<DisciplineController>(DisciplineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
