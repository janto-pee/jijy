import { Module } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { VariantsResolver } from './variants.resolver';
import { variantsProviders } from './variants.provider';

@Module({
  providers: [VariantsResolver, VariantsService, ...variantsProviders],
})
export class VariantsModule {}
