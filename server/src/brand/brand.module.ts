import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandResolver } from './brand.resolver';
import { DatabaseModule } from 'src/database.module';
import { brandProviders } from './brand.provider';
import { ProductService } from 'src/product/product.service';
import { productProviders } from 'src/product/product.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    BrandResolver,
    BrandService,
    ...brandProviders,
    ProductService,
    ...productProviders,
  ],
})
export class BrandModule {}
