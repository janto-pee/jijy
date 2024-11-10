import { Module } from '@nestjs/common';
import { VariantsOptionService } from './variants-option.service';
import { VariantsOptionResolver } from './variants-option.resolver';

@Module({
  providers: [VariantsOptionResolver, VariantsOptionService],
})
export class VariantsOptionModule {}
