import { Test, TestingModule } from '@nestjs/testing';
import { CouponService } from './coupon.service';
import { couponsProviders } from './coupon.provider';

describe('CouponService', () => {
  let service: CouponService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouponService, ...couponsProviders],
    }).compile();

    service = module.get<CouponService>(CouponService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
