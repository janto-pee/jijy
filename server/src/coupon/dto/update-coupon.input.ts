import { CreateCouponInput } from './create-coupon.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCouponInput extends PartialType(CreateCouponInput) {
  id: number;
}
