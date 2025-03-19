import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SessionService } from './session.service';
import { CreateSessionInput } from './dto/create-session.input';
import { SessionResponse } from './dto/session-response';
import { GqlAuthGuard } from './session.guard';
import { Request, UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { SessionProfile } from './dto/profile-session';

@Resolver()
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => SessionResponse)
  async login(
    @Args('createSessionInput') createSessionInput: CreateSessionInput,
  ) {
    return await this.sessionService.signIn(
      createSessionInput.email,
      createSessionInput.password,
    );
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')

  @UseGuards(GqlAuthGuard)
  @Query(() => SessionProfile)
  getProfile(@Request() req) {
    console.log(
      req,
      'req.header....................................................',
      req.header,
    );
    return req.user;
  }
}
