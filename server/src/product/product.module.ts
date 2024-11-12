import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { productProviders } from './product.provider';

@Module({
  providers: [ProductResolver, ProductService, ...productProviders],
})
export class ProductModule {}
