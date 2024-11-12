import { Inject, Injectable } from '@nestjs/common';
import { CreateStaffInput } from './dto/create-staff.input';
import { UpdateStaffInput } from './dto/update-staff.input';
import { Staff } from './entities/staff.entity';

@Injectable()
export class StaffService {
  constructor(
    @Inject('STAFF_REPOSITORY')
    private StaffsRepository: typeof Staff,
  ) {}
  async create(createStaffInput: CreateStaffInput): Promise<Staff> {
    return await this.StaffsRepository.create({
      ...createStaffInput,
    });
  }

  async findAll(): Promise<Staff[]> {
    return await this.StaffsRepository.findAll<Staff>();
  }

  async findOne(id: number): Promise<Staff> {
    return await this.StaffsRepository.findOne<Staff>({
      where: { id: id },
    });
  }

  async findEmail(email: String): Promise<Staff> {
    return await this.StaffsRepository.findOne<Staff>({
      where: { email: email },
    });
  }

  async update(where: any, data: UpdateStaffInput): Promise<Staff> {
    const Staff = await this.StaffsRepository.findOne({
      where: { ...where },
    });
    await Staff.update({ ...data });
    await Staff.save();
    return Staff;
  }

  async remove(id: number): Promise<Staff> {
    return await this.StaffsRepository.findOne<Staff>({
      where: { id: id },
    });
  }
}
