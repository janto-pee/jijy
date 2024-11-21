import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';

@Resolver('Payment')
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation('createPayment')
  async create(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ) {
    return await this.paymentService.create(createPaymentInput);
  }

  @Query('payment')
  async findAll() {
    return await this.paymentService.findAll();
  }

  @Query('payment')
  async findOne(@Args('id') id: number) {
    return await this.paymentService.findOne(id);
  }

  @Mutation('updatePayment')
  async update(
    @Args('updatePaymentInput') updatePaymentInput: UpdatePaymentInput,
  ) {
    return await this.paymentService.update(
      updatePaymentInput.id,
      updatePaymentInput,
    );
  }

  @Mutation('removePayment')
  async remove(@Args('id') id: number) {
    return await this.paymentService.remove(id);
  }
}
