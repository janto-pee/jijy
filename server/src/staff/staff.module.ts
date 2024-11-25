import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffResolver } from './staff.resolver';
import { StaffProviders } from './staff.providers';
import { UsersService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.provider';

@Module({
  providers: [
    StaffResolver,
    StaffService,
    ...StaffProviders,
    UsersService,
    ...usersProviders,
  ],
})
export class StaffModule {}
