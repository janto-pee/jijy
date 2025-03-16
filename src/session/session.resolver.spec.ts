import { Test, TestingModule } from '@nestjs/testing';
import { SessionResolver } from './session.resolver';
import { SessionService } from './session.service';
import { sessionProviders } from './session.provider';

describe('SessionResolver', () => {
  let resolver: SessionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionResolver, SessionService, ...sessionProviders],
    }).compile();

    resolver = module.get<SessionResolver>(SessionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
