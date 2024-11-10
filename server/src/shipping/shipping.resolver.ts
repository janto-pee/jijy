import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ShippingService } from './shipping.service';
import { CreateShippingInput } from './dto/create-shipping.input';
import { UpdateShippingInput } from './dto/update-shipping.input';

@Resolver('Shipping')
export class ShippingResolver {
  constructor(private readonly shippingService: ShippingService) {}

  @Mutation('createShipping')
  create(@Args('createShippingInput') createShippingInput: CreateShippingInput) {
    return this.shippingService.create(createShippingInput);
  }

  @Query('shipping')
  findAll() {
    return this.shippingService.findAll();
  }

  @Query('shipping')
  findOne(@Args('id') id: number) {
    return this.shippingService.findOne(id);
  }

  @Mutation('updateShipping')
  update(@Args('updateShippingInput') updateShippingInput: UpdateShippingInput) {
    return this.shippingService.update(updateShippingInput.id, updateShippingInput);
  }

  @Mutation('removeShipping')
  remove(@Args('id') id: number) {
    return this.shippingService.remove(id);
  }
}
