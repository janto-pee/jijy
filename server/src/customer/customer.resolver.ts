import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Resolver('Customer')
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Mutation('createCustomer')
  async create(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ) {
    const customer = await this.customerService.create(createCustomerInput);
    return customer;
  }

  @Query('customers')
  async findAll() {
    const customer = await this.customerService.findAll();
    return customer;
  }

  @Query('customer')
  async findOne(@Args('id') id: number) {
    const customer = await this.customerService.findOne(id);
    return customer;
  }

  @Mutation('updateCustomer')
  async update(
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ) {
    const customer = await this.customerService.update(
      updateCustomerInput.id,
      updateCustomerInput,
    );
    return customer;
  }

  @Mutation('removeCustomer')
  async remove(@Args('id') id: number) {
    return await this.customerService.remove(id);
  }
}
