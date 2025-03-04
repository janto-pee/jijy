import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeResolver } from './attribute.resolver';
import { AttributeProviders } from './attribute.provider';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...AttributeProviders, AttributeResolver, AttributeService],
})
export class AttributeModule {}
