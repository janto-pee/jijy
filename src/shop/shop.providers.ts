import { Shop } from './entities/shop.entity';

export const shopProviders = [
  {
    provide: 'SHOP_REPOSITORY',
    useValue: Shop,
  },
];
