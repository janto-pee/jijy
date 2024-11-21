import { Inject, Injectable } from '@nestjs/common';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @Inject('BRANDS_REPOSITORY')
    private BrandsRepository: typeof Brand,
  ) {}
  async create(createBrandInput: CreateBrandInput): Promise<Brand> {
    return await this.BrandsRepository.create({
      ...createBrandInput,
    });
  }

  async findAll(): Promise<Brand[]> {
    return await this.BrandsRepository.findAll<Brand>();
  }

  async findOne(id: number): Promise<Brand> {
    return await this.BrandsRepository.findOne<Brand>({
      where: { id: id },
    });
  }

  async findEmail(email: String): Promise<Brand> {
    return await this.BrandsRepository.findOne<Brand>({
      where: { email: email },
    });
  }

  async update(id: number, data: UpdateBrandInput): Promise<Brand> {
    const brand = await this.BrandsRepository.findOne({
      where: { id: id },
    });
    if (!brand) {
      throw new Error('brand not found');
    }
    await brand.update({ ...data });
    await brand.save();
    return brand;
  }

  async remove(id: number): Promise<Brand> {
    const brand = await this.BrandsRepository.findOne<Brand>({
      where: { id: id },
    });
    await brand.destroy();
    return brand;
  }
}
