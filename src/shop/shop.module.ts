import { Module } from '@nestjs/common';
import { shopProviders } from './shop.providers';
import { ShopResolver } from './shop.resolver';
import { ShopService } from './shop.service';
import { DatabaseModule } from 'src/database.module';
import { ProductService } from 'src/product/product.service';
import { OrderService } from 'src/order/order.service';
import { BrandService } from 'src/brand/brand.service';
import { UserService } from 'src/user/user.service';
import { productProviders } from 'src/product/product.provider';
import { orderProviders } from 'src/order/order.provider';
import { brandProviders } from 'src/brand/brand.provider';
import { userProviders } from 'src/user/user.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ShopResolver,
    ShopService,
    ProductService,
    ...productProviders,
    OrderService,
    ...orderProviders,
    BrandService,
    ...brandProviders,
    UserService,
    ...userProviders,
    ...shopProviders,
  ],
})
export class ShopModule {}
