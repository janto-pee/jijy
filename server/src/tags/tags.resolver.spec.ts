import { Test, TestingModule } from '@nestjs/testing';
import { TagsResolver } from './tags.resolver';
import { TagsService } from './tags.service';
import { tagsProviders } from './tags.providers';

describe('TagsResolver', () => {
  let resolver: TagsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagsResolver, TagsService, ...tagsProviders],
    }).compile();

    resolver = module.get<TagsResolver>(TagsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
