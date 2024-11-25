import { Module } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesResolver } from './attributes.resolver';
import { attributesProviders } from './attributes.provider';
import { ProductService } from 'src/product/product.service';
import { productProviders } from 'src/product/product.provider';

@Module({
  providers: [
    AttributesResolver,
    AttributesService,
    ...attributesProviders,
    ProductService,
    ...productProviders,
  ],
})
export class AttributesModule {}
