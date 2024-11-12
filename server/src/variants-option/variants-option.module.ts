import { Module } from '@nestjs/common';
import { VariantsOptionService } from './variants-option.service';
import { VariantsOptionResolver } from './variants-option.resolver';
import { DatabaseModule } from 'src/database.module';
import { VariantsOptionProviders } from './variants-option.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    VariantsOptionResolver,
    VariantsOptionService,
    ...VariantsOptionProviders,
  ],
})
export class VariantsOptionModule {}
