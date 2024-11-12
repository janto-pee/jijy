import { Product } from './entities/product.entity';

export const productProviders = [
  {
    provide: 'PRODUCTS_REPOSITORY',
    useValue: Product,
  },
];
