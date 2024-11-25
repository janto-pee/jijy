import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { orderProviders } from './order.provider';
import { ProductService } from 'src/product/product.service';
import { productProviders } from 'src/product/product.provider';
import { ShopsService } from 'src/shops/shops.service';
import { shopProviders } from 'src/shops/shops.providers';

@Module({
  providers: [
    OrdersResolver,
    OrdersService,
    ...orderProviders,
    ProductService,
    ...productProviders,
    ShopsService,
    ...shopProviders,
  ],
})
export class OrdersModule {}
