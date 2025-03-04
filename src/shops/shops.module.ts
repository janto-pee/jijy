import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsResolver } from './shops.resolver';
import { DatabaseModule } from 'src/database.module';
import { shopsProviders } from './shops.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...shopsProviders, ShopsResolver, ShopsService],
})
export class ShopsModule {}
