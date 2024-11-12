import { Module } from '@nestjs/common';
import { CatgeoriesService } from './catgeories.service';
import { CatgeoriesResolver } from './catgeories.resolver';

@Module({
  providers: [CatgeoriesResolver, CatgeoriesService],
})
export class CatgeoriesModule {}
