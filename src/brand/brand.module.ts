import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandResolver } from './brand.resolver';
import { DatabaseModule } from 'src/database.module';
import { brandProviders } from './brand.provider';

@Module({
  imports: [DatabaseModule],
  providers: [BrandResolver, BrandService, ...brandProviders],
})
export class BrandModule {}
