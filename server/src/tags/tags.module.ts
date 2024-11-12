import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolver';
import { tagsProviders } from './tags.providers';

@Module({
  providers: [TagsResolver, TagsService, ...tagsProviders],
})
export class TagsModule {}
