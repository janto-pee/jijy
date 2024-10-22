import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SessionService } from './session.service';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';

@Resolver('Session')
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation('createSession')
  create(@Args('createSessionInput') createSessionInput: CreateSessionInput) {
    return this.sessionService.create(createSessionInput);
  }

  @Query('session')
  findAll() {
    return this.sessionService.findAll();
  }

  @Query('session')
  findOne(@Args('id') id: number) {
    return this.sessionService.findOne(id);
  }

  @Mutation('updateSession')
  update(@Args('updateSessionInput') updateSessionInput: UpdateSessionInput) {
    return this.sessionService.update(updateSessionInput.id, updateSessionInput);
  }

  @Mutation('removeSession')
  remove(@Args('id') id: number) {
    return this.sessionService.remove(id);
  }
}
