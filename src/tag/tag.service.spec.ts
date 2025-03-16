import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import { tagProviders } from './tag.providers';

describe('TagService', () => {
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagService, ...tagProviders],
    }).compile();

    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
