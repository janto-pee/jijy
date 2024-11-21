import { Inject, Injectable } from '@nestjs/common';
import { CreateVariantInput } from './dto/create-variant.input';
import { UpdateVariantInput } from './dto/update-variant.input';
import { Variant } from './entities/variant.entity';

@Injectable()
export class VariantsService {
  constructor(
    @Inject('VARIANTS_REPOSITORY')
    private VariantsRepository: typeof Variant,
  ) {}
  async create(createVariantInput: CreateVariantInput): Promise<Variant> {
    return await this.VariantsRepository.create({
      ...createVariantInput,
    });
  }

  async findAll(): Promise<Variant[]> {
    return await this.VariantsRepository.findAll<Variant>();
  }

  async findOne(id: number): Promise<Variant> {
    return await this.VariantsRepository.findOne<Variant>({
      where: { id: id },
    });
  }

  async findEmail(email: String): Promise<Variant> {
    return await this.VariantsRepository.findOne<Variant>({
      where: { email: email },
    });
  }

  async update(id: number, data: UpdateVariantInput): Promise<Variant> {
    const Variant = await this.VariantsRepository.findOne({
      where: { id: id },
    });
    if (!Variant) {
      throw new Error('variants not found');
    }
    await Variant.update({ ...data });
    await Variant.save();
    return Variant;
  }

  async remove(id: number): Promise<Variant> {
    const variant = await this.VariantsRepository.findOne<Variant>({
      where: { id: id },
    });
    await variant.destroy();
    return variant;
  }
}
