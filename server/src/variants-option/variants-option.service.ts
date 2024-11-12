import { Inject, Injectable } from '@nestjs/common';
import { CreateVariantsOptionInput } from './dto/create-variants-option.input';
import { UpdateVariantsOptionInput } from './dto/update-variants-option.input';
import { VariantsOption } from './entities/variants-option.entity';

@Injectable()
export class VariantsOptionService {
  constructor(
    @Inject('VariantsOptionS_REPOSITORY')
    private VariantsOptionsRepository: typeof VariantsOption,
  ) {}
  async create(
    createVariantsOptionInput: CreateVariantsOptionInput,
  ): Promise<VariantsOption> {
    return await this.VariantsOptionsRepository.create({
      ...createVariantsOptionInput,
    });
  }

  async findAll(): Promise<VariantsOption[]> {
    return await this.VariantsOptionsRepository.findAll<VariantsOption>();
  }

  async findOne(id: number): Promise<VariantsOption> {
    return await this.VariantsOptionsRepository.findOne<VariantsOption>({
      where: { id: id },
    });
  }

  async findEmail(email: String): Promise<VariantsOption> {
    return await this.VariantsOptionsRepository.findOne<VariantsOption>({
      where: { email: email },
    });
  }

  async update(params: {
    where: any;
    data: UpdateVariantsOptionInput;
  }): Promise<VariantsOption> {
    const { where, data } = params;
    const VariantsOption = await this.VariantsOptionsRepository.findOne({
      where: { ...where },
    });
    await VariantsOption.update({ ...data });
    await VariantsOption.save();
    return VariantsOption;
  }

  async remove(id: number): Promise<VariantsOption> {
    return await this.VariantsOptionsRepository.findOne<VariantsOption>({
      where: { id: id },
    });
  }
}
