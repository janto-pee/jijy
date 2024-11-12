import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffResolver } from './staff.resolver';
import { StaffProviders } from './staff.providers';

@Module({
  providers: [StaffResolver, StaffService, ...StaffProviders],
})
export class StaffModule {}
