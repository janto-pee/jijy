import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandResolver } from './brand.resolver';
import { DatabaseModule } from 'src/database.module';
import { brandProviders } from './brand.provider';
import { ProductService } from 'src/product/product.service';
import { productProviders } from 'src/product/product.provider';
import { ShopService } from 'src/shop/shop.service';
import { shopProviders } from 'src/shop/shop.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    BrandResolver,
    BrandService,
    ...brandProviders,
    ProductService,
    ...productProviders,
    ShopService,
    ...shopProviders,
  ],
})
export class BrandModule {}
