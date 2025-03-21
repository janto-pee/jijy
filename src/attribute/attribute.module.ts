import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeResolver } from './attribute.resolver';
import { DatabaseModule } from 'src/database.module';
import { attributeProviders } from './attribute.provider';
import { ProductService } from 'src/product/product.service';
import { productProviders } from 'src/product/product.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    AttributeResolver,
    AttributeService,
    ...attributeProviders,
    ProductService,
    ...productProviders,
  ],
})
export class AttributeModule {}
