import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { tagsProviders } from './tags.providers';

describe('TagsService', () => {
  let service: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagsService, ...tagsProviders],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
