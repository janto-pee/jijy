import { Test, TestingModule } from '@nestjs/testing';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { orderProviders } from './order.provider';

describe('OrdersResolver', () => {
  let resolver: OrdersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersResolver, OrdersService, ...orderProviders],
    }).compile();

    resolver = module.get<OrdersResolver>(OrdersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
