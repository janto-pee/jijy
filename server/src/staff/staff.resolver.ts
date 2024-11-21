import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StaffService } from './staff.service';
import { CreateStaffInput } from './dto/create-staff.input';
import { UpdateStaffInput } from './dto/update-staff.input';

@Resolver('Staff')
export class StaffResolver {
  constructor(private readonly staffService: StaffService) {}

  @Mutation('createStaff')
  async create(@Args('createStaffInput') createStaffInput: CreateStaffInput) {
    return await this.staffService.create(createStaffInput);
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
