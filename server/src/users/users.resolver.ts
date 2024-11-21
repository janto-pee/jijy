import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789abcdefghi', 6);

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user = await this.usersService.create(createUserInput);
    return user;
  }

  @Query('users')
  async findAll() {
    return await this.usersService.findUsers();
  }

  @Query('user')
  async findOne(@Args('id') id: number) {
    const user = await this.usersService.findUser(id);
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }

  @Mutation('updateUser')
  async update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const user = await this.usersService.updateUser({
      where: { id: updateUserInput.id },
      data: { ...updateUserInput },
    });
    return user;
  }

  @Mutation('verifyUser')
  async verifyUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args('verification') verification: String,
  ) {
    const user = await this.findOne(updateUserInput.id);

    if (!user) {
      throw new Error('user not found');
    }

    if (user.is_email_verified) {
      throw new Error('user not verified');
    }
    if (user.verificationCode === verification) {
      user.verificationCode = null;
      user.is_email_verified = true;
      await user.save();
      return user;
    }
  }

  @Mutation('forgotPassword')
  async forgotPassword(@Args('email') email: String) {
    const user = await this.usersService.findEmail(email);
    console.log('user .....', user);
    const pRC = nanoid(7);
    if (!user) {
      return {
        email: email,
        message: `email does not exist`,
      };
    }
    if (!user.is_email_verified) {
      user.verificationCode = pRC;
      await user.save();
      return {
        email: user.email,
        message: `kindly verify your email first ${user.verificationCode}`,
      };
    }
    user.passwordResetCode = pRC;
    await user.save();
    return user;
  }

  @Mutation('resetPassword')
  async resetPasswordHandler(
    @Args('id') id: number,
    @Args('resetcode') resetcode: String,
    @Args('password') password: string,
  ) {
    console.log(id, resetcode, password);
    const user = await this.usersService.findUser(id);
    if (
      !user ||
      !user.passwordResetCode ||
      user.passwordResetCode !== resetcode
    ) {
      throw new Error('unable to reset password');
    }
    if (!user.is_email_verified) {
      throw new Error('kindly verify your email before you proceed');
    }
    user.passwordResetCode = null;
    // user.password = await hashPassword(password);
    user.password = password;
    await user.save();
    return user;
  }
}
