import { Sale } from './entities/sale.entity';

export const salesProviders = [
  {
    provide: 'SALES_REPOSITORY',
    useValue: Sale,
  },
];
