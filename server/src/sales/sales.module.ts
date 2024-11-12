import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesResolver } from './sales.resolver';
import { salesProviders } from './sales.provider';

@Module({
  providers: [SalesResolver, SalesService, ...salesProviders],
})
export class SalesModule {}
