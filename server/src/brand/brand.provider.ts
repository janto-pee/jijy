import { Brand } from './entities/brand.entity';

export const brandProviders = [
  {
    provide: 'BRAND_REPOSITORY',
    useValue: Brand,
  },
];
