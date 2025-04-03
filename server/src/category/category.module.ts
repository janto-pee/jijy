import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { DatabaseModule } from 'src/database.module';
import { categoryProviders } from './category.provider';
import { ProductService } from 'src/product/product.service';
import { productProviders } from 'src/product/product.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    CategoryResolver,
    CategoryService,
    ...categoryProviders,
    ProductService,
    ...productProviders,
  ],
})
export class CategoryModule {}
