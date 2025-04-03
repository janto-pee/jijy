import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressResolver } from './address.resolver';
import { DatabaseModule } from 'src/database.module';
import { addressProviders } from './address.provider';
import { UserService } from 'src/user/user.service';
import { userProviders } from 'src/user/user.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    AddressResolver,
    AddressService,
    ...addressProviders,
    UserService,
    ...userProviders,
  ],
})
export class AddressModule {}
