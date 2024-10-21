import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { VerifyUserDto } from './dto/verify-user.dto';
import { comparePassword } from 'src/utils/hashPassword';
import { userService } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async findUsers(): Promise<User[]> {
    return await this.usersRepository.findAll<User>();
  }

  async findUser(id: string): Promise<User> {
    return await this.usersRepository.findOne<User>({ where: { id: id } });
  }
  async findEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne<User>({
      where: { email: email },
    });
  }
  async createUser(userdata: userService): Promise<User> {
    return await this.usersRepository.create({ ...userdata });
  }

  async updateUser(params: { where: any; data: VerifyUserDto }): Promise<User> {
    const { where, data } = params;
    const user = await this.usersRepository.findOne({
      where: { ...where },
    });
    await user.update({ ...data });
    await user.save();
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne<User>({
      where: { email: email },
    });

    if (!user || user.hashed_password === null) return false;

    const match = await comparePassword(password, user.hashed_password);

    if (match) {
      return user;
    }

    return false;
  }
}
