import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AddressService } from 'src/address/address.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly addressService: AddressService,
  ) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return (await this.userService.create(createUserInput)).dataValues;
  }

  @Query(() => [User], { name: 'Users' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => User, { name: 'User' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return (await this.userService.findOne(id)).dataValues;
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return (await this.userService.update(updateUserInput.id, updateUserInput))
      .dataValues;
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => String }) id: string) {
    return (await this.userService.remove(id)).dataValues;
  }

  @ResolveField()
  async addresses(@Parent() user: User) {
    const { id } = user;
    const address = await this.addressService.findOne({ userId: id });
    if (!address) {
      throw new Error();
    }
    return address.dataValues;
  }
}
