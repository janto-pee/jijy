import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CouponService } from './coupon.service';
import { CreateCouponInput } from './dto/create-coupon.input';
import { UpdateCouponInput } from './dto/update-coupon.input';

@Resolver('Coupon')
export class CouponResolver {
  constructor(private readonly couponService: CouponService) {}

  @Mutation('createCoupon')
  async create(
    @Args('createCouponInput') createCouponInput: CreateCouponInput,
  ) {
    return await this.couponService.create(createCouponInput);
  }

  @Query('coupons')
  async findAll() {
    return await this.couponService.findAll();
  }

  @Query('coupon')
  async findOne(@Args('id') id: number) {
    return await this.couponService.findOne(id);
  }

  @Mutation('updateCoupon')
  async update(
    @Args('updateCouponInput') updateCouponInput: UpdateCouponInput,
  ) {
    return await this.couponService.update(
      updateCouponInput.id,
      updateCouponInput,
    );
  }

  @Mutation('removeCoupon')
  remove(@Args('id') id: number) {
    return this.couponService.remove(id);
  }
}
