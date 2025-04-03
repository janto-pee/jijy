import {
  Inject,
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserRole } from './entities/user.entity';
import { WhereOptions, FindOptions } from 'sequelize';
import { PaginationArgs } from 'src/common/dto/pagination.dto';
import { hashPassword } from 'src/util/hashPassword';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  /**
   * Creates a new address
   * @param createAddressDto - The address data to create
   * @returns The created address
   */

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      this.logger.log(
        `Creating new address: ${createUserInput.email || 'Untitled'}`,
      );
      // Check if user already exists
      const existingUser = await this.userRepository.findOne({
        where: {
          email: createUserInput.email,
          username: createUserInput.username,
        },
      });

      if (existingUser) {
        throw new BadRequestException('User with this email already exists');
      }

      const hashedPassword = await hashPassword(createUserInput.password);

      const newUser = await this.userRepository.create({
        ...createUserInput,
        password: hashedPassword,
        verificationCode: uuidv4(),
        role: createUserInput.role || UserRole.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return newUser;
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`, error.stack);
      throw new BadRequestException(`Failed to create user: ${error.message}`);
    }
  }

  async findAll(pagination?: PaginationArgs): Promise<User[]> {
    try {
      const options: FindOptions = { raw: true };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        options.order = [['createdAt', 'DESC']];
      }
      this.logger.log(
        `finding all users: ${options.limit}, limit  ${pagination && pagination.limit}`,
      );

      return await this.userRepository.findAll<User>(options);
    } catch (error) {
      this.logger.error(`Failed to fetch users: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOne(search: WhereOptions<any>): Promise<User> {
    try {
      this.logger.log(`Finding user by ID: ${search}`);
      const user = await this.userRepository.findOne<User>({
        where: search,
      });

      if (!user) {
        throw new NotFoundException(`User not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to find user: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      await user.update({ ...data });
      await user.save();

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to update user: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne<User>({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      await user.destroy();
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to remove user: ${error.message}`, error.stack);
      throw error;
    }
  }

  async countUsers(filter?: WhereOptions<any>): Promise<number> {
    try {
      return await this.userRepository.count({
        where: filter || {},
      });
    } catch (error) {
      this.logger.error(`Failed to count users: ${error.message}`, error.stack);
      throw error;
    }
  }

  async filterBy(
    search: WhereOptions<any>,
    pagination?: PaginationArgs,
  ): Promise<User[]> {
    try {
      const options: FindOptions = {
        where: search,
        raw: true,
      };

      if (pagination) {
        const { limit, offset } = pagination;
        options.limit = limit;
        options.offset = offset;
        options.order = [['createdAt', 'DESC']];
      }

      return await this.userRepository.findAll(options);
    } catch (error) {
      this.logger.error(
        `Failed to filter users: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
