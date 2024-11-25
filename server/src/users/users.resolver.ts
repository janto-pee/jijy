import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { customAlphabet } from 'nanoid';
import { hashPassword } from 'src/utils/hashpassword';
import Ctx from 'src/utils/context.type';

const nanoid = customAlphabet('0123456789abcdefghi', 6);

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    const password = await hashPassword(createUserInput.password);
    const user = await this.usersService.create({
      ...createUserInput,
      password: password,
    });
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
    @Args('id') id: number,
    @Args('verification') verification: string,
  ) {
    console.log('got here', id, verification);
    const user = await this.usersService.findUser(id);

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
      email: user.email,
      message: `kindly check your email for your password reset code ${user.passwordResetCode}`,
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
      throw new Error('unable to reset password');
    }
    if (!user.is_email_verified) {
      throw new Error('kindly verify your email before you proceed');
    }
    user.passwordResetCode = null;
    // user.password = await hashPassword(password);
    user.password = await hashPassword(password);
    await user.save();
    return user;
  }

  @Query('me')
  async me(@Context() context: Ctx) {
    return context.req.user;
  }
}
