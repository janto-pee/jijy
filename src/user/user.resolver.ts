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
import { UsersResponse } from './dto/user-response.dto';
import { PaginationArgs } from 'src/common/dto/pagination.dto';
import {
  UseGuards,
  Logger,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/session/guard/jwt-auth.guard';
import { RolesGuard } from 'src/session/guard/role.guard';
import { Roles } from 'src/session/decorator/roles.decorator';
import { UserRole } from './entities/user.entity';
import { CurrentUser } from 'src/session/decorator/current-user.decorator';
import { ChangePasswordInput } from './dto/change-password.input';
import { comparePassword, hashPassword } from 'src/util/hashPassword';

@Resolver(() => User)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);

  constructor(
    private readonly userService: UserService,
    private readonly addressService: AddressService,
  ) {}

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @CurrentUser() currentUser: User,
  ) {
    try {
      this.logger.log(`User ${currentUser.id} creating new user`);
      return (await this.userService.create(createUserInput)).dataValues;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Query(() => UsersResponse, { name: 'Users' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAll(
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      // Use Promise.all for parallel execution
      const [users, totalCount] = await Promise.all([
        this.userService.findAll(paginationParams),
        this.userService.countUsers(),
      ]);

      return {
        items: users,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
        limit: paginationParams.limit,
      };
    } catch (error) {
      this.logger.error(`Failed to fetch users: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Query(() => User, { name: 'User' })
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() currentUser: User,
  ) {
    try {
      // Allow users to fetch their own data or admins to fetch any user
      if (id !== currentUser.id && currentUser.role !== UserRole.ADMIN) {
        throw new ForbiddenException('You can only access your own user data');
      }

      const user = await this.userService.findOne({ id });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user.dataValues;
    } catch (error) {
      this.logger.error(`Failed to find user: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Query(() => User, { name: 'Me' })
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() currentUser: User) {
    try {
      const user = await this.userService.findOne({ id: currentUser.id });
      return user.dataValues;
    } catch (error) {
      this.logger.error(
        `Failed to get current user: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: User,
  ) {
    try {
      this.logger.log(`Updating user with ID: ${updateUserInput.id}`);
      // Allow users to update their own data or admins to update any user
      if (
        updateUserInput.id !== currentUser.id &&
        currentUser.role !== UserRole.ADMIN
      ) {
        throw new ForbiddenException('You can only update your own user data');
      }

      return (
        await this.userService.update(updateUserInput.id, updateUserInput)
      ).dataValues;
    } catch (error) {
      this.logger.error(`Failed to update user: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Changes a user's password
   * @param id - User ID
   * @param changePasswordInput - Old and new password
   * @returns Success message
   */
  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
    @CurrentUser() currentUser: User,
  ) {
    try {
      this.logger.log(`Changing password for user: ${currentUser.id}`);

      // Find user with password field
      const user = await this.userService.findOne({ id: currentUser.id });
      if (!user) {
        throw new NotFoundException(`User with ID ${currentUser.id} not found`);
      }

      // Verify old password
      const isPasswordValid = await comparePassword(
        changePasswordInput.oldPassword,
        user.password,
      );

      if (!isPasswordValid) {
        throw new BadRequestException('Current password is incorrect');
      }

      // Hash and update new password
      const hashedPassword = await hashPassword(
        changePasswordInput.newPassword,
      );

      await this.userService.update(currentUser.id, {
        id: currentUser.id,
        password: hashedPassword,
      });

      this.logger.log(
        `Password changed successfully for user with ID: ${currentUser.id}`,
      );
      return {
        success: true,
        message: 'Password changed successfully',
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      this.logger.error(
        `Failed to change password: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException(
        `Failed to change password: ${error.message}`,
      );
    }
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async removeUser(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() currentUser: User,
  ) {
    try {
      // Prevent admins from deleting themselves
      if (id === currentUser.id) {
        throw new BadRequestException('You cannot delete your own account');
      }

      return (await this.userService.remove(id)).dataValues;
    } catch (error) {
      this.logger.error(`Failed to remove user: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Query(() => UsersResponse, { name: 'FilterUsers' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async filterUsers(
    @Args('role', { nullable: true }) role?: string,
    @Args('isActive', { nullable: true }) isActive?: boolean,
    @Args('pagination', { nullable: true }) pagination?: PaginationArgs,
  ) {
    try {
      // Build filter criteria
      const filter: any = {};

      if (role) filter.role = role;
      if (isActive !== undefined) filter.isActive = isActive;

      // Default pagination if not provided
      const paginationParams = pagination || { limit: 10, offset: 0 };

      // Use Promise.all for parallel execution
      const [users, totalCount] = await Promise.all([
        this.userService.filterBy(filter, paginationParams),
        this.userService.countUsers(filter),
      ]);

      return {
        items: users,
        totalCount,
        hasMore: paginationParams.offset + paginationParams.limit < totalCount,
        page: Math.floor(paginationParams.offset / paginationParams.limit) + 1,
        pages: Math.ceil(totalCount / paginationParams.limit),
        limit: paginationParams.limit,
      };
    } catch (error) {
      this.logger.error(
        `Failed to filter users: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  @ResolveField()
  async addresses(@Parent() user: User) {
    try {
      const { id } = user;
      const address = await this.addressService.findOne({ userId: id });
      if (!address) {
        return null;
      }
      return address.dataValues;
    } catch (error) {
      this.logger.error(
        `Failed to resolve addresses: ${error.message}`,
        error.stack,
      );
      return null;
    }
  }
}
