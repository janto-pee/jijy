import { Module } from '@nestjs/common';
import { StoredetailsService } from './storedetails.service';
import { StoredetailsResolver } from './storedetails.resolver';
import { storedetailsProviders } from './storedetails.provider';
import { DatabaseModule } from 'src/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...storedetailsProviders,
    StoredetailsResolver,
    StoredetailsService,
  ],
})
export class StoredetailsModule {}
