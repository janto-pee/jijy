import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SessionService } from './session.service';
import { Session } from './entities/session.entity';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';

@Resolver(() => Session)
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => Session)
  async createSession(
    @Args('createSessionInput') createSessionInput: CreateSessionInput,
  ) {
    return await this.sessionService.create(createSessionInput);
  }

  @Query(() => [Session], { name: 'sessions' })
  async findAll() {
    return await this.sessionService.findAll();
  }

  @Query(() => Session, { name: 'session' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.sessionService.findOne(id);
  }

  @Mutation(() => Session)
  async updateSession(
    @Args('updateSessionInput') updateSessionInput: UpdateSessionInput,
  ) {
    return await this.sessionService.update(
      updateSessionInput.id,
      updateSessionInput,
    );
  }

  @Mutation(() => Session)
  async removeSession(@Args('id', { type: () => String }) id: string) {
    return await this.sessionService.remove(id);
  }
}
