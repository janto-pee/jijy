import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';
import { reviewProviders } from './reviews.providers';
import { ProductService } from 'src/product/product.service';
import { productProviders } from 'src/product/product.provider';
import { PaymentService } from 'src/payment/payment.service';
import { paymentProviders } from 'src/payment/payment.provider';
import { CustomerService } from 'src/customer/customer.service';
import { customerProviders } from 'src/customer/customer.provider';

describe('ReviewsResolver', () => {
  let resolver: ReviewsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsResolver,
        ReviewsService,
        ...reviewProviders,
        ProductService,
        ...productProviders,
        PaymentService,
        ...paymentProviders,
        CustomerService,
        ...customerProviders,
      ],
    }).compile();

    resolver = module.get<ReviewsResolver>(ReviewsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
