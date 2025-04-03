import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    try {
      // Find the user by ID to ensure they still exist and are active
      const user = await this.usersService.findOne(payload.sub);

      if (!user) {
        throw new UnauthorizedException('User no longer exists');
      }

      if (!user.isActive) {
        throw new UnauthorizedException('User account is inactive');
      }

      // Return user data to be attached to request
      return {
        id: payload.sub,
        username: payload.username,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        role: payload.role,
        shopId: payload.shopId,
        permissions: payload.permissions || [],
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { UserService } from 'src/user/user.service';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private usersService: UserService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: 'secretKey', // Replace with your own secret
//     });
//   }

//   async validate(payload: any) {
//     return {
//       username: payload.username,
//       email: payload.email,
//       first_name: payload.firstName,
//       lastName: payload.lastName,
//     };
//   }
// }
