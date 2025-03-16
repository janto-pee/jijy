import { Test, TestingModule } from '@nestjs/testing';
import { AttributeService } from './attribute.service';
import { attributeProviders } from './attribute.provider';

describe('AttributeService', () => {
  let service: AttributeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttributeService, ...attributeProviders],
    }).compile();

    service = module.get<AttributeService>(AttributeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
