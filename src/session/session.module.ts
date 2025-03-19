import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionResolver } from './session.resolver';
import { UserService } from 'src/user/user.service';
import { userProviders } from 'src/user/user.provider';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    SessionResolver,
    UserService,
    SessionService,
    // JwtService,
    JwtStrategy,
    ...userProviders,
  ],
})
export class SessionModule {}
