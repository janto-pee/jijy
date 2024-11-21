import { Inject, Injectable } from '@nestjs/common';
import { CreateAttributeInput } from './dto/create-attribute.input';
import { UpdateAttributeInput } from './dto/update-attribute.input';
import { Attribute } from './entities/attribute.entity';

@Injectable()
export class AttributesService {
  constructor(
    @Inject('ATTRIBUTES_REPOSITORY')
    private AttributesRepository: typeof Attribute,
  ) {}
  async create(createAttributeInput: CreateAttributeInput): Promise<Attribute> {
    return await this.AttributesRepository.create({
      ...createAttributeInput,
    });
  }

  async findAll(): Promise<Attribute[]> {
    return await this.AttributesRepository.findAll<Attribute>();
  }

  async findOne(id: number): Promise<Attribute> {
    return await this.AttributesRepository.findOne<Attribute>({
      where: { id: id },
    });
  }

  async findEmail(email: String): Promise<Attribute> {
    return await this.AttributesRepository.findOne<Attribute>({
      where: { email: email },
    });
  }

  async update(id: number, data: UpdateAttributeInput): Promise<Attribute> {
    const Attribute = await this.AttributesRepository.findOne({
      where: { id: id },
    });
    if (!Attribute) {
      throw new Error('attribute not found');
    }
    await Attribute.update({ ...data });
    await Attribute.save();
    return Attribute;
  }

  async remove(id: number): Promise<Attribute> {
    return await this.AttributesRepository.findOne<Attribute>({
      where: { id: id },
    });
  }
}
