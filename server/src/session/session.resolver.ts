import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SessionService } from './session.service';
import { UpdateSessionInput } from './dto/update-session.input';
import { ValidateUserInput } from './dto/validate-user.input';

@Resolver('Session')
export class SessionResolver {
  constructor(
    private readonly sessionService: SessionService,
    // private readonly usersService: UsersService,
  ) {}

  @Mutation('createSession')
  async create(
    @Args('validateUserInput') validateUserInput: ValidateUserInput,
  ) {
    console.log(
      'create session....',
      validateUserInput.email,
      validateUserInput.password,
    );
    const user = { id: 1 };
    // await this.usersService.validateUser(
    //   validateUserInput.email,
    //   validateUserInput.password,
    // );
    if (!user) {
      return {
        id: `id not found`,
        email: `email or password does not exist`,
        message: `unable to create session`,
      };
    }

    return await this.sessionService.create({
      userId: user.id,
      userAgent: '',
      valid: true,
    });
  }

  @Query('session')
  findOne(@Args('id') id: number) {
    return this.sessionService.findSession(id);
  }

  @Mutation('updateSession')
  update(@Args('updateSessionInput') updateSessionInput: UpdateSessionInput) {
    return this.sessionService.updateSession(updateSessionInput.id);
  }
}
