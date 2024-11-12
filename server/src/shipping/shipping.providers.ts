import { Shipping } from './entities/shipping.entity';

export const shippingProviders = [
  {
    provide: 'SHIPPING_REPOSITORY',
    useValue: Shipping,
  },
];
