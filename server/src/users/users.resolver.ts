import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { customAlphabet } from 'nanoid';
import { hashPassword } from 'src/utils/hashPassword';

const nanoid = customAlphabet('0123456789abcdefghi', 6);

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    // const password = await hashPassword(createUserInput.password);

    const user = await this.usersService.create({
      ...createUserInput,
      password: createUserInput.password,
    });
    return {
      id: user.id,
      email: user.email,
      message: `user successfully created. kindly check your email to verify`,
    };
  }

  @Query('users')
  async findAll() {
    return await this.usersService.findUsers();
  }

  @Query('user')
  async findOne(@Args('id') id: number) {
    const user = await this.usersService.findUser(id);
    return user;
  }

  @Mutation('updateUser')
  async update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const user = await this.usersService.updateUser({
      where: { id: updateUserInput.id },
      data: { ...updateUserInput },
    });
    return {
      id: user.id,
      email: user.email,
      message: `user successfully updated`,
    };
  }

  @Mutation('verifyUser')
  async verifyUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args('verification') verification: String,
  ) {
    const user = await this.findOne(updateUserInput.id);
    if (!user) {
      return {
        id: 'id does not exist',
        email: user.email,
        message: `email does not exist`,
      };
    }
    if (user.is_email_verified) {
      return {
        email: user.email,
        message: `user already verified`,
      };
    }
    if (user.verificationCode === verification) {
      user.verificationCode = null;
      user.is_email_verified = true;
      await user.save();
      return {
        id: user.id,
        email: user.email,
        message: `user is now verified`,
      };
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
    return {
      id: user.id,
      email: user.email,
      message: `check your email for the password reset code ${user.passwordResetCode}`,
    };
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
      return {
        email: user.email,
        message: `user does not exist`,
      };
    }
    if (!user.is_email_verified) {
      return { email: user.email, message: 'kindly verify your email first' };
    }
    user.passwordResetCode = null;
    // user.password = await hashPassword(password);
    user.password = password;
    await user.save();
    return {
      id: user.id,
      email: user.email,
      message: `password reset successful`,
    };
  }
}
