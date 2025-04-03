import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { UserService } from 'src/user/user.service';

@Resolver(() => Address)
export class AddressResolver {
  constructor(
    private readonly addressService: AddressService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Address)
  async createAddress(
    @Args('createAddressInput') createAddressInput: CreateAddressInput,
  ) {
    return (await this.addressService.create(createAddressInput)).dataValues;
  }

  @Query(() => [Address], { name: 'Addresses' })
  async findAll() {
    const address = await this.addressService.findAll();
    return address;
  }

  @Query(() => Address, { name: 'Address' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    const address = await this.addressService.findOne(id);
    if (!address) {
      throw new Error('address not found');
    }
    return address.dataValues;
  }

  @Mutation(() => Address)
  async updateAddress(
    @Args('updateAddressInput') updateAddressInput: UpdateAddressInput,
  ) {
    const address = await this.addressService.update(
      updateAddressInput.id,
      updateAddressInput,
    );
    return address.dataValues;
  }

  @Mutation(() => Address)
  async removeAddress(@Args('id', { type: () => String }) id: string) {
    const address = await this.addressService.remove(id);
    return address.dataValues;
  }

  @ResolveField()
  async user(@Parent() address: Address) {
    const { userId } = address;
    return (await this.userService.findOne(userId)).dataValues;
  }
}
