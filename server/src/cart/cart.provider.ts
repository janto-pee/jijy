import { Cart } from './entities/cart.entity';

export const cartProviders = [
  {
    provide: 'CARTS_REPOSITORY',
    useValue: Cart,
  },
];
