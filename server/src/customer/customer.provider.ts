import { Customer } from './entities/Customer.entity';

export const customerProviders = [
  {
    provide: 'CUSTOMERS_REPOSITORY',
    useValue: Customer,
  },
];
