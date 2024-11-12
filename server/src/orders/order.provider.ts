import { Order } from './entities/Order.entity';

export const orderProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useValue: Order,
  },
];
