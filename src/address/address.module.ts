import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressResolver } from './address.resolver';
import { DatabaseModule } from 'src/database.module';
import { addressProviders } from './address.provider';

@Module({
  imports: [DatabaseModule],
  providers: [AddressResolver, AddressService, ...addressProviders],
})
export class AddressModule {}
