import { Injectable } from '@nestjs/common';
import { CreateVariantsOptionInput } from './dto/create-variants-option.input';
import { UpdateVariantsOptionInput } from './dto/update-variants-option.input';

@Injectable()
export class VariantsOptionService {
  create(createVariantsOptionInput: CreateVariantsOptionInput) {
    return 'This action adds a new variantsOption';
  }

  findAll() {
    return `This action returns all variantsOption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variantsOption`;
  }

  update(id: number, updateVariantsOptionInput: UpdateVariantsOptionInput) {
    return `This action updates a #${id} variantsOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} variantsOption`;
  }
}
