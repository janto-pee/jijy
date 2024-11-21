import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressResolver } from './address.resolver';
import { addressProviders } from './address.provider';
import { UsersService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.provider';

@Module({
  providers: [
    AddressResolver,
    AddressService,
    ...addressProviders,
    UsersService,
    ...usersProviders,
  ],
})
export class AddressModule {}
