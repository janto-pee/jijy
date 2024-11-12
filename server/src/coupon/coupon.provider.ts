import { Coupon } from './entities/Coupon.entity';

export const couponsProviders = [
  {
    provide: 'COUPONS_REPOSITORY',
    useValue: Coupon,
  },
];
