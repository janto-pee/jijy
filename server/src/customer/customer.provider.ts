import { Customer } from './entities/customer.entity';

export const customerProviders = [
  {
    provide: 'CUSTOMERS_REPOSITORY',
    useValue: Customer,
  },
];
