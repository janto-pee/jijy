import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeResolver } from './attribute.resolver';
import { DatabaseModule } from 'src/database.module';
import { attributeProviders } from './attribute.provider';

@Module({
  imports: [DatabaseModule],
  providers: [AttributeResolver, AttributeService, ...attributeProviders],
})
export class AttributeModule {}
