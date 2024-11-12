import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsResolver } from './brands.resolver';
import { brandsProviders } from './brands.provider';

@Module({
  providers: [BrandsResolver, BrandsService, ...brandsProviders],
})
export class BrandsModule {}
