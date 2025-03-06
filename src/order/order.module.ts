import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { DatabaseModule } from 'src/database.module';
import { orderProviders } from './order.provider';

@Module({
  imports: [DatabaseModule],
  providers: [OrderResolver, OrderService, ...orderProviders],
})
export class OrderModule {}
