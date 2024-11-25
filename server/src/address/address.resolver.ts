import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AddressService } from './address.service';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { UsersService } from 'src/users/users.service';
import Ctx from 'src/utils/context.type';

@Resolver('Address')
export class AddressResolver {
  constructor(
    private readonly addressService: AddressService,
    private readonly userService: UsersService,
  ) {}

  @Mutation('createAddress')
  async create(
    @Args('createAddressInput') createAddressInput: CreateAddressInput,
    @Context() context: any,
  ) {
    const address = await this.addressService.create(createAddressInput);
    // const user = await this.userService.findUser(createAddressInput.userId);
    const { user } = context.req.user;
    if (!user) {
      throw new Error('access token expired, kindly login again');
    }
    console.log('user....', user);
    const foundUser = await this.userService.findUser(user);
    if (!foundUser) {
      throw new Error('user not found');
    }
    address.user = foundUser;
    await address.save();
    return address;
  }

  @Query('addresses')
  async findAll() {
    const addresses = await this.addressService.findAll();
    return addresses;
  }

  @Query('address')
  async findOne(@Args('id') id: number) {
    return await this.addressService.findOne(id);
  }

  @Mutation('updateAddress')
  async update(
    @Args('updateAddressInput') updateAddressInput: UpdateAddressInput,
  ) {
    return await this.addressService.update(
      updateAddressInput.id,
      updateAddressInput,
    );
  }

  @Mutation('removeAddress')
  async remove(@Args('id') id: number) {
    return await this.addressService.remove(id);
  }
}
