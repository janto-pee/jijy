import { Coupon } from './entities/coupon.entity';

export const couponsProviders = [
  {
    provide: 'COUPONS_REPOSITORY',
    useValue: Coupon,
  },
];
