import { Test, TestingModule } from '@nestjs/testing';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { orderProviders } from './order.provider';
import { ShopsService } from 'src/shops/shops.service';
import { ProductService } from 'src/product/product.service';
import { productProviders } from 'src/product/product.provider';
import { shopProviders } from 'src/shops/shops.providers';

describe('OrdersResolver', () => {
  let resolver: OrdersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersResolver,
        OrdersService,
        ...orderProviders,
        ProductService,
        ...productProviders,
        ShopsService,
        ...shopProviders,
      ],
    }).compile();

    resolver = module.get<OrdersResolver>(OrdersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
