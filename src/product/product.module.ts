import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { DatabaseModule } from 'src/database.module';
import { productProviders } from './product.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...productProviders, ProductResolver, ProductService],
})
export class ProductModule {}
