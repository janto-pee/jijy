import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressResolver } from './address.resolver';
import { addressProviders } from './address.provider';

@Module({
  providers: [AddressResolver, AddressService, ...addressProviders],
})
export class AddressModule {}
