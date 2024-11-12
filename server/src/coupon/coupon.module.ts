import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponResolver } from './coupon.resolver';
import { couponsProviders } from './coupon.provider';

@Module({
  providers: [CouponResolver, CouponService, ...couponsProviders],
})
export class CouponModule {}
