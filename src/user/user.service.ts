import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}
  async create(createUserInput: CreateUserInput): Promise<User> {
    return await this.userRepository.create({
      ...createUserInput,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }

  async findOne(id: string): Promise<User> {
    const User = await this.userRepository.findOne<User>({
      where: { id: id },
    });
    if (!User) {
      throw new Error('User not found');
    }
    return User;
  }

  async findEmail(email: string): Promise<User> {
    const User = await this.userRepository.findOne<User>({
      where: { email: email },
    });
    if (!User) {
      throw new Error('User not found');
    }
    return User;
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    const User = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!User) {
      throw new Error('Users not found');
    }
    await User.update({ ...data });
    await User.save();
    return User;
  }

  async remove(id: string): Promise<User> {
    const User = await this.userRepository.findOne<User>({
      where: { id: id },
    });
    if (!User) {
      throw new Error('User not found');
    }
    await User.destroy();
    return User;
  }
}
