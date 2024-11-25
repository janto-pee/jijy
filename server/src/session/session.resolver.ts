import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { UpdateSessionInput } from './dto/update-session.input';
import { ValidateUserInput } from './dto/validate-user.input';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/hashpassword';
import { signJwt, verifyJwt } from 'src/utils/jwt';
import { CookieOptions } from 'express';
import Ctx from 'src/utils/context.type';

const cookieOptions: CookieOptions = {
  domain: 'localhost', // <- Change to your client domain
  secure: false, // <- Should be true if !development
  sameSite: 'strict',
  httpOnly: true,
  path: '/',
};

@Resolver('Session')
export class SessionResolver {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UsersService,
  ) {}

  @Mutation('createSession')
  async create(
    @Args('validateUserInput') validateUserInput: ValidateUserInput,
    @Context() context: Ctx,
  ) {
    const user = await this.userService.findEmail(validateUserInput.email);
    if (!user) {
      // throw new Error('user not found');
      throw new UnauthorizedException();
    }
    const password = await comparePassword(
      validateUserInput.password,
      user.password,
    );
    if (!password) {
      throw new Error('username or password incorrect');
    }

    const session = await this.sessionService.create({
      userAgent: '',
      valid: true,
    });

    const accessToken = signJwt(
      { user: user.id, session: session.id },
      'accessTokenPrivate',
      { expiresIn: process.env.ACCESS_TOKEN_TTL },
    );

    const refreshToken = signJwt(
      { user: user.id, session: session.id },
      'refreshTokenPrivate',
      { expiresIn: process.env.REFRESH_TOKEN_TTL },
    );

    context.res.cookie('token', accessToken, cookieOptions);

    return {
      session,
      accessToken,
      refreshToken,
    };
  }

  @Query('session')
  async findOne(@Context() context: Ctx) {
    return context.req.user;
  }

  @Mutation('updateSession')
  async update(@Context() context: Ctx) {
    context.res.cookie('token', '', { ...cookieOptions, maxAge: 0 });
    return context.req.user;
  }
}
