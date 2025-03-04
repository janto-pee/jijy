import { Test, TestingModule } from '@nestjs/testing';
import { ImagesResolver } from './images.resolver';
import { ImagesService } from './images.service';
import { imagesProviders } from './image.provider';

describe('ImagesResolver', () => {
  let resolver: ImagesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagesResolver, ImagesService, ...imagesProviders],
    }).compile();

    resolver = module.get<ImagesResolver>(ImagesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
