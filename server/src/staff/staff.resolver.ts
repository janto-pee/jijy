import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StaffService } from './staff.service';
import { CreateStaffInput } from './dto/create-staff.input';
import { UpdateStaffInput } from './dto/update-staff.input';
import { UsersService } from 'src/users/users.service';

@Resolver('Staff')
export class StaffResolver {
  constructor(
    private readonly staffService: StaffService,
    private readonly userService: UsersService,
  ) {}

  @Mutation('createStaff')
  async create(@Args('createStaffInput') createStaffInput: CreateStaffInput) {
    const user = await this.userService.findUser(createStaffInput.user);
    if (!user) {
      throw new Error('user not found ');
    }
    const staff = await this.staffService.create(createStaffInput);
    staff.user = user;
    return await staff.save();
  }

  @Query('staffs')
  async findAll() {
    return await this.staffService.findAll();
  }

  @Query('staff')
  async findOne(@Args('id') id: number) {
    return await this.staffService.findOne(id);
  }

  @Mutation('updateStaff')
  async update(@Args('updateStaffInput') updateStaffInput: UpdateStaffInput) {
    return await this.staffService.update(
      updateStaffInput.id,
      updateStaffInput,
    );
  }

  @Mutation('removeStaff')
  async remove(@Args('id') id: number) {
    return await this.staffService.remove(id);
  }
}
