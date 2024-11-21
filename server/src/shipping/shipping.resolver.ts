import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ShippingService } from './shipping.service';
import { CreateShippingInput } from './dto/create-shipping.input';
import { UpdateShippingInput } from './dto/update-shipping.input';

@Resolver('Shipping')
export class ShippingResolver {
  constructor(private readonly shippingService: ShippingService) {}

  @Mutation('createShipping')
  async create(
    @Args('createShippingInput') createShippingInput: CreateShippingInput,
  ) {
    return await this.shippingService.create(createShippingInput);
  }

  @Query('shippings')
  async findAll() {
    return await this.shippingService.findAll();
  }

  @Query('shipping')
  async findOne(@Args('id') id: number) {
    return await this.shippingService.findOne(id);
  }

  @Mutation('updateShipping')
  async update(
    @Args('updateShippingInput') updateShippingInput: UpdateShippingInput,
  ) {
    return await this.shippingService.update(
      updateShippingInput.id,
      updateShippingInput,
    );
  }

  @Mutation('removeShipping')
  async remove(@Args('id') id: number) {
    return await this.shippingService.remove(id);
  }
}
