import { Payment } from './entities/Payment.entity';

export const paymentProviders = [
  {
    provide: 'PAYMENT_REPOSITORY',
    useValue: Payment,
  },
];
