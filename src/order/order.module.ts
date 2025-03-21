import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { DatabaseModule } from 'src/database.module';
import { orderProviders } from './order.provider';
import { ShopService } from 'src/shop/shop.service';
import { shopProviders } from 'src/shop/shop.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    OrderResolver,
    OrderService,
    ...orderProviders,
    ShopService,
    ...shopProviders,
  ],
})
export class OrderModule {}
