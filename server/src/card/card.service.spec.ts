import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from './card.service';
import { CardResolver } from './card.resolver';
import { CardProviders } from './card.provider';

describe('CardService', () => {
  let service: CardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardResolver, CardService, ...CardProviders],
    }).compile();

    service = module.get<CardService>(CardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
