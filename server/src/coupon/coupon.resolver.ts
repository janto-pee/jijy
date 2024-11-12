import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CouponService } from './coupon.service';
import { CreateCouponInput } from './dto/create-coupon.input';
import { UpdateCouponInput } from './dto/update-coupon.input';

@Resolver('Coupon')
export class CouponResolver {
  constructor(private readonly couponService: CouponService) {}

  @Mutation('createCoupon')
  create(@Args('createCouponInput') createCouponInput: CreateCouponInput) {
    return this.couponService.create(createCouponInput);
  }

  @Query('coupon')
  findAll() {
    return this.couponService.findAll();
  }

  @Query('coupon')
  findOne(@Args('id') id: number) {
    return this.couponService.findOne(id);
  }

  @Mutation('updateCoupon')
  update(@Args('updateCouponInput') updateCouponInput: UpdateCouponInput) {
    return this.couponService.update(updateCouponInput.id, updateCouponInput);
  }

  @Mutation('removeCoupon')
  remove(@Args('id') id: number) {
    return this.couponService.remove(id);
  }
}
