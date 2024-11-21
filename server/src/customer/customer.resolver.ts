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
    return await this.customerService.create(createCustomerInput);
  }

  @Query('customers')
  async findAll() {
    return await this.customerService.findAll();
  }

  @Query('customer')
  async findOne(@Args('id') id: number) {
    return await this.customerService.findOne(id);
  }

  @Mutation('updateCustomer')
  async update(
    @Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput,
  ) {
    return await this.customerService.update(
      updateCustomerInput.id,
      updateCustomerInput,
    );
  }

  @Mutation('removeCustomer')
  async remove(@Args('id') id: number) {
    return await this.customerService.remove(id);
  }
}
