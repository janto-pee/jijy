import { Test, TestingModule } from '@nestjs/testing';
import { SessionService } from './session.service';
import { sessionProviders } from './session.provider';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionService, ...sessionProviders],
    }).compile();

    service = module.get<SessionService>(SessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
