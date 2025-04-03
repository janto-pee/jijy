import { Test, TestingModule } from '@nestjs/testing';
import { ImageResolver } from './image.resolver';
import { ImageService } from './image.service';
import { imageProviders } from './image.provider';

describe('ImageResolver', () => {
  let resolver: ImageResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageResolver, ImageService, ...imageProviders],
    }).compile();

    resolver = module.get<ImageResolver>(ImageResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
