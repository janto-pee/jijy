import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { userProviders } from './user.provider';
import { DatabaseModule } from 'src/database.module';
import { addressProviders } from 'src/address/address.provider';
import { AddressService } from 'src/address/address.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserResolver,
    UserService,
    ...userProviders,
    AddressService,
    ...addressProviders,
  ],
})
export class UserModule {}
