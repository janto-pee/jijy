import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';
import { tagProviders } from './tag.provider';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...tagProviders, TagResolver, TagService],
})
export class TagModule {}
