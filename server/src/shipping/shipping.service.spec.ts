import { Test, TestingModule } from '@nestjs/testing';
import { ShippingService } from './shipping.service';
import { shippingProviders } from './shipping.providers';

describe('ShippingService', () => {
  let service: ShippingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingService, ...shippingProviders],
    }).compile();

    service = module.get<ShippingService>(ShippingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
