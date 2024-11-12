import { Card } from './entities/card.entity';

export const CardProviders = [
  {
    provide: 'CARDS_REPOSITORY',
    useValue: Card,
  },
];
