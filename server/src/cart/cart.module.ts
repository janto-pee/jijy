import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { cartProviders } from './cart.provider';

@Module({
  providers: [CartResolver, CartService, ...cartProviders],
})
export class CartModule {}
