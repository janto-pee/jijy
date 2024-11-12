import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { orderProviders } from './order.provider';

@Module({
  providers: [OrdersResolver, OrdersService, ...orderProviders],
})
export class OrdersModule {}
