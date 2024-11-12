import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionResolver } from './session.resolver';
import { UsersService } from 'src/users/users.service';
import { DatabaseModule } from 'src/database.module';
import { sessionProviders } from './session.provider';

// @Module({
//   providers: [SessionResolver, SessionService, UsersService],
// })
@Module({
  imports: [DatabaseModule],
  providers: [SessionResolver, SessionService, ...sessionProviders],
})
export class SessionModule {}
