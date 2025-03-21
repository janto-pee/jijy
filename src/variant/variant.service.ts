import { Inject, Injectable } from '@nestjs/common';
import { CreateVariantInput } from './dto/create-variant.input';
import { UpdateVariantInput } from './dto/update-variant.input';
import { Variant } from './entities/variant.entity';

@Injectable()
export class VariantService {
  constructor(
    @Inject('VARIANT_REPOSITORY')
    private VariantsRepository: typeof Variant,
  ) {}
  async create(createVariantInput: CreateVariantInput): Promise<Variant> {
    return await this.VariantsRepository.create({
      ...createVariantInput,
    });
  }

  async findAll(): Promise<Variant[]> {
    return await this.VariantsRepository.findAll<Variant>({ raw: true });
  }

  async findOne(search: any): Promise<Variant> {
    const variant = await this.VariantsRepository.findOne<Variant>({
      where: search,
    });
    if (!variant) {
      throw new Error('variant not found');
    }
    return variant;
  }

  async findEmail(email: string): Promise<Variant> {
    const variant = await this.VariantsRepository.findOne<Variant>({
      where: { email: email },
    });
    if (!variant) {
      throw new Error('variant not found');
    }
    return variant;
  }

  async update(id: string, data: UpdateVariantInput): Promise<Variant> {
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

  async remove(id: string): Promise<Variant> {
    const variant = await this.VariantsRepository.findOne<Variant>({
      where: { id: id },
    });
    if (!variant) {
      throw new Error('variant not found');
    }
    await variant.destroy();
    return variant;
  }
}
