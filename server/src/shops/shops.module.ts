import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsResolver } from './shops.resolver';
import { shopProviders } from './shops.providers';

@Module({
  providers: [ShopsResolver, ShopsService, ...shopProviders],
})
export class ShopsModule {}
