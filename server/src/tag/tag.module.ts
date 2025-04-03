import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';
import { tagProviders } from './tag.providers';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [TagResolver, TagService, ...tagProviders],
})
export class TagModule {}
