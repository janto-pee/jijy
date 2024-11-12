import { Inject, Injectable } from '@nestjs/common';
import { CreateCouponInput } from './dto/create-coupon.input';
import { UpdateCouponInput } from './dto/update-coupon.input';
import { Coupon } from './entities/Coupon.entity';

@Injectable()
export class CouponService {
  constructor(
    @Inject('COUPONS_REPOSITORY')
    private CouponsRepository: typeof Coupon,
  ) {}
  async create(createCouponInput: CreateCouponInput): Promise<Coupon> {
    return await this.CouponsRepository.create({
      ...createCouponInput,
    });
  }

  async findAll(): Promise<Coupon[]> {
    return await this.CouponsRepository.findAll<Coupon>();
  }

  async findOne(id: number): Promise<Coupon> {
    return await this.CouponsRepository.findOne<Coupon>({
      where: { id: id },
    });
  }

  async findEmail(email: String): Promise<Coupon> {
    return await this.CouponsRepository.findOne<Coupon>({
      where: { email: email },
    });
  }

  async update(where: any, data: UpdateCouponInput): Promise<Coupon> {
    const Coupon = await this.CouponsRepository.findOne({
      where: { ...where },
    });
    await Coupon.update({ ...data });
    await Coupon.save();
    return Coupon;
  }

  async remove(id: number): Promise<Coupon> {
    return await this.CouponsRepository.findOne<Coupon>({
      where: { id: id },
    });
  }
}
