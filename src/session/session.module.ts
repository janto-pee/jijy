import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionResolver } from './session.resolver';
import { sessionProviders } from './session.provider';

@Module({
  providers: [SessionResolver, SessionService, ...sessionProviders],
})
export class SessionModule {}
