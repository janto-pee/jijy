import { Module } from '@nestjs/common';
import { shopProviders } from './shop.providers';
import { ShopResolver } from './shop.resolver';
import { ShopService } from './shop.service';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ShopResolver, ShopService, ...shopProviders],
})
export class ShopModule {}
