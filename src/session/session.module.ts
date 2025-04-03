import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionResolver } from './session.resolver';
import { UserService } from 'src/user/user.service';
import { userProviders } from 'src/user/user.provider';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || jwtConstants.secret,
        signOptions: {
          expiresIn:
            configService.get('JWT_EXPIRES_IN') || jwtConstants.expiresIn,
        },
      }),
    }),
  ],
  providers: [
    SessionResolver,
    SessionService,
    UserService,
    JwtStrategy,
    ...userProviders,
  ],
  exports: [JwtStrategy, PassportModule, JwtModule, SessionService],
})
export class SessionModule {}

// import { Module } from '@nestjs/common';
// import { SessionService } from './session.service';
// import { SessionResolver } from './session.resolver';
// import { UserService } from 'src/user/user.service';
// import { userProviders } from 'src/user/user.provider';
// import { JwtService } from '@nestjs/jwt';
// import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
// import { JwtStrategy } from './jwt.strategy';

// @Module({
//   imports: [
//     JwtModule.register({
//       global: true,
//       secret: jwtConstants.secret,
//       signOptions: { expiresIn: '60s' },
//     }),
//   ],
//   providers: [
//     SessionResolver,
//     UserService,
//     SessionService,
//     // JwtService,
//     JwtStrategy,
//     ...userProviders,
//   ],
// })
// export class SessionModule {}
