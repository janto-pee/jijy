import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { ProductService } from 'src/product/product.service';
import { PaymentService } from 'src/payment/payment.service';
import { CustomerService } from 'src/customer/customer.service';

@Resolver('Review')
export class ReviewsResolver {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly productService: ProductService,
    private readonly paymentService: PaymentService,
    private readonly customerService: CustomerService,
  ) {}

  @Mutation('createReview')
  async create(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
  ) {
    const product = await this.productService.findOne(
      createReviewInput.product,
    );
    if (!product) {
      throw new Error('category not found');
    }
    const payment = await this.paymentService.findOne(
      createReviewInput.payment,
    );
    if (!payment) {
      throw new Error('payment not found');
    }
    const customer = await this.customerService.findOne(
      createReviewInput.customer,
    );
    if (!customer) {
      throw new Error('customer not found');
    }
    const review = await this.reviewsService.create(createReviewInput);
    review.product = product;
    review.payment = payment;
    review.customer = customer;
    return await review.save();
  }

  @Query('reviews')
  async findAll() {
    return await this.reviewsService.findAll();
  }

  @Query('review')
  async findOne(@Args('id') id: number) {
    return await this.reviewsService.findOne(id);
  }

  @Mutation('updateReview')
  async update(
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
  ) {
    return await this.reviewsService.update(
      updateReviewInput.id,
      updateReviewInput,
    );
  }

  @Mutation('removeReview')
  async remove(@Args('id') id: number) {
    return await this.reviewsService.remove(id);
  }
}
