import { Module } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesResolver } from './attributes.resolver';
import { attributesProviders } from './attributes.provider';

@Module({
  providers: [AttributesResolver, AttributesService, ...attributesProviders],
})
export class AttributesModule {}
