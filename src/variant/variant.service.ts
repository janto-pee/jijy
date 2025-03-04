import { Inject, Injectable } from '@nestjs/common';
import { CreateVariantInput } from './dto/create-variant.input';
import { UpdateVariantInput } from './dto/update-variant.input';
import { Repository } from 'typeorm';
import { Variant } from './entities/variant.entity';

@Injectable()
export class VariantService {
  constructor(
    @Inject('VARIANT_REPOSITORY')
    private variantRepository: Repository<Variant>,
  ) {}
  create(createVariantInput: CreateVariantInput) {
    return 'This action adds a new variant';
  }

  findAll() {
    return `This action returns all variant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variant`;
  }

  update(id: number, updateVariantInput: UpdateVariantInput) {
    return `This action updates a #${id} variant`;
  }

  remove(id: number) {
    return `This action removes a #${id} variant`;
  }
}
