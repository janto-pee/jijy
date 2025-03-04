import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantResolver } from './variant.resolver';
import { variantProviders } from './variant.provider';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...variantProviders, VariantResolver, VariantService],
})
export class VariantModule {}
