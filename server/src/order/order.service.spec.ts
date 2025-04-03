import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { orderProviders } from './order.provider';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, ...orderProviders],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
