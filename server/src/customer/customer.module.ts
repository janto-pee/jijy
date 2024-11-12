import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { customerProviders } from './customer.provider';

@Module({
  providers: [CustomerResolver, CustomerService, ...customerProviders],
})
export class CustomerModule {}
