import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Mutation(() => Address)
  async createAddress(
    @Args('createAddressInput') createAddressInput: CreateAddressInput,
  ) {
    return await this.addressService.create(createAddressInput);
  }

  @Query(() => [Address], { name: 'Addresses' })
  async findAll() {
    const address = await this.addressService.findAll();
    console.log('address resolver ...............................', address);
    return address;
  }

  @Query(() => Address, { name: 'Address' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.addressService.findOne(id);
  }

  @Mutation(() => Address)
  async updateAddress(
    @Args('updateAddressInput') updateAddressInput: UpdateAddressInput,
  ) {
    return await this.addressService.update(
      updateAddressInput.id,
      updateAddressInput,
    );
  }

  @Mutation(() => Address)
  async removeAddress(@Args('id', { type: () => String }) id: string) {
    return await this.addressService.remove(id);
  }
}
