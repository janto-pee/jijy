import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';

@Resolver('Customer')
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Mutation('createCustomer')
  create(@Args('createCustomerInput') createCustomerInput: CreateCustomerInput) {
    return this.customerService.create(createCustomerInput);
  }

  @Query('customer')
  findAll() {
    return this.customerService.findAll();
  }

  @Query('customer')
  findOne(@Args('id') id: number) {
    return this.customerService.findOne(id);
  }

  @Mutation('updateCustomer')
  update(@Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput) {
    return this.customerService.update(updateCustomerInput.id, updateCustomerInput);
  }

  @Mutation('removeCustomer')
  remove(@Args('id') id: number) {
    return this.customerService.remove(id);
  }
}
