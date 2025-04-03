import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { SessionService } from './session.service';
import { UseGuards } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { AuthResponse } from './dto/auth-response.dto';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { RefreshTokenResponse } from './dto/refresh-token.input';
import { LogoutResponse } from './dto/logout-response.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CurrentUser } from './decorator/current-user.decorator';

@Resolver()
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return this.sessionService.login(loginInput);
  }

  @Mutation(() => AuthResponse)
  async register(@Args('registerInput') registerInput: RegisterInput) {
    return this.sessionService.register(registerInput);
  }

  @Mutation(() => RefreshTokenResponse)
  async refreshToken(@Args('refreshTokenInput') { token }: RefreshTokenInput) {
    return this.sessionService.refreshToken(token);
  }

  @Mutation(() => LogoutResponse)
  @UseGuards(JwtAuthGuard)
  async logout(@CurrentUser() user: any) {
    return this.sessionService.logout(user.id);
  }

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: any) {
    return `You are authenticated as ${user.email}`;
  }
}

// import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
// import { SessionService } from './session.service';
// import { CreateSessionInput } from './dto/create-session.input';
// import { SessionResponse } from './dto/session-response';
// import { GqlAuthGuard } from './session.guard';
// import { Request, UseGuards } from '@nestjs/common';
// import { User } from 'src/user/entities/user.entity';
// import { SessionProfile } from './dto/profile-session';

// @Resolver()
// export class SessionResolver {
//   constructor(private readonly sessionService: SessionService) {}

//   @Mutation(() => SessionResponse)
//   async login(
//     @Args('createSessionInput') createSessionInput: CreateSessionInput,
//   ) {
//     return await this.sessionService.signIn(
//       createSessionInput.email,
//       createSessionInput.password,
//     );
//   }

//   // @UseGuards(AuthGuard)
//   // @Get('profile')

//   @UseGuards(GqlAuthGuard)
//   @Query(() => SessionProfile)
//   getProfile(@Request() req) {
//     console.log(
//       req,
//       'req.header....................................................',
//       req.header,
//     );
//     return req.user;
//   }
// }
