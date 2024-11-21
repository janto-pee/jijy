import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SessionService } from './session.service';
import { UpdateSessionInput } from './dto/update-session.input';
import { ValidateUserInput } from './dto/validate-user.input';
import { UsersService } from 'src/users/users.service';

@Resolver('Session')
export class SessionResolver {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UsersService,
  ) {}

  @Mutation('createSession')
  async create(
    @Args('validateUserInput') validateUserInput: ValidateUserInput,
  ) {
    const user = await this.userService.findEmail(validateUserInput.email);
    if (!user) {
      throw new Error('user not found');
    }
    if (user.password !== validateUserInput.password) {
      throw new Error('username or password incorrect');
    }
    const session = await this.sessionService.create({
      userAgent: '',
      valid: true,
    });
    // session.user = user;
    // await session.save();
    return session;
  }

  @Query('session')
  async findOne(@Args('id') id: number) {
    const session = await this.sessionService.findSession(id);
    return session;
  }

  @Mutation('updateSession')
  async update(
    @Args('updateSessionInput') updateSessionInput: UpdateSessionInput,
  ) {
    return await this.sessionService.updateSession(updateSessionInput.id);
  }
}
