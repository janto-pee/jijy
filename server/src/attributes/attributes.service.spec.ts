import { Test, TestingModule } from '@nestjs/testing';
import { AttributesService } from './attributes.service';
import { attributesProviders } from './attributes.provider';
import { ProductService } from 'src/product/product.service';

describe('AttributesService', () => {
  let service: AttributesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttributesService, ...attributesProviders],
    }).compile();

    service = module.get<AttributesService>(AttributesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('createAttributes', () => {
  //   it('should create attributes', () => {
  //     // Arrange
  //     // service.tweets = [];
  //     const payload = {
  //       name: 'String',
  //       value: 'String',
  //       description: 'String',
  //       type: 'String',
  //       mandatory: 'String',
  //       variation: 'String',
  //       translatable: 'String',
  //     };

  //     // Act
  //     const tweet = service.create(payload);

  //     // Assert
  //     expect(tweet).toBe(payload);
  //     expect(service.).toHaveLength(1);
  //   });
  // });
});
