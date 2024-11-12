import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardResolver } from './card.resolver';
import { CardProviders } from './card.provider';

@Module({
  providers: [CardResolver, CardService, ...CardProviders],
})
export class CardModule {}
