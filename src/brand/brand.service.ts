import { Inject, Injectable } from '@nestjs/common';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @Inject('BRAND_REPOSITORY')
    private brandRepository: typeof Brand,
  ) {}
  async create(createBrandInput: CreateBrandInput): Promise<Brand> {
    return await this.brandRepository.create({
      ...createBrandInput,
    });
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandRepository.findAll<Brand>({ raw: true });
  }

  async findOne(id: string) {
    return await this.brandRepository.findOne<Brand>({
      where: { id: id },
    });
  }

  async findEmail(email: string) {
    return await this.brandRepository.findOne<Brand>({
      where: { email: email },
    });
  }

  async update(id: string, data: UpdateBrandInput): Promise<Brand> {
    const brand = await this.brandRepository.findOne({
      where: { id: id },
    });
    if (!brand) {
      throw new Error('brand not found');
    }
    await brand.update({ ...data });
    await brand.save();
    return brand;
  }

  async remove(id: string): Promise<Brand> {
    const brand = await this.brandRepository.findOne<Brand>({
      where: { id: id },
    });
    if (!brand) {
      throw new Error('address not found');
    }
    await brand.destroy();
    return brand;
  }
}
