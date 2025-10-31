import { Test, TestingModule } from '@nestjs/testing';
import { SubModulesService } from './sub-modules.service';

describe('SubModulesService', () => {
  let service: SubModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubModulesService],
    }).compile();

    service = module.get<SubModulesService>(SubModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
