import { Test, TestingModule } from '@nestjs/testing';
import { SessionResolver } from './session.resolver';
import { SessionService } from './session.service';
import { sessionProviders } from './session.provider';
import { UsersService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.provider';

describe('SessionResolver', () => {
  let resolver: SessionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionResolver,
        SessionService,
        ...sessionProviders,
        UsersService,
        ...usersProviders,
      ],
    }).compile();

    resolver = module.get<SessionResolver>(SessionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
