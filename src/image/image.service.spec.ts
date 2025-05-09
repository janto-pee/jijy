import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from './image.service';
import { imageProviders } from './image.provider';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageService, ...imageProviders],
    }).compile();

    service = module.get<ImageService>(ImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
