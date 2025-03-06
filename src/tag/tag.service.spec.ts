import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from './tag.service';
import { tagProviders } from './tag.providers';

describe('TagsService', () => {
  let service: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagsService, ...tagProviders],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
