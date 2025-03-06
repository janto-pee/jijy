import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { productProviders } from './product.provider';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ProductResolver, ProductService, ...productProviders],
})
export class ProductModule {}
// VariantsService,
// ...variantsProviders,
// ShopsService,
// ...shopProviders,
// AttributesService,
// ImagesService,
// ...imageProviders,
// ...attributesProviders,
// BrandsService,
// CategoryService,
// ...categoryProviders,
// ...brandsProviders,
