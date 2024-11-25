import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { reviewProviders } from './reviews.providers';
import { ProductService } from 'src/product/product.service';
import { productProviders } from 'src/product/product.provider';
import { PaymentService } from 'src/payment/payment.service';
import { paymentProviders } from 'src/payment/payment.provider';
import { CustomerService } from 'src/customer/customer.service';
import { customerProviders } from 'src/customer/customer.provider';

@Module({
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
})
export class ReviewsModule {}
