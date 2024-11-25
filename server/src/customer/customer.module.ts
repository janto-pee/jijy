import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { customerProviders } from './customer.provider';
import { UsersService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.provider';

@Module({
  providers: [
    CustomerResolver,
    CustomerService,
    ...customerProviders,
    UsersService,
    ...usersProviders,
  ],
})
export class CustomerModule {}
