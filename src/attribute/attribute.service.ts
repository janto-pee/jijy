import { Inject, Injectable } from '@nestjs/common';
import { CreateAttributeInput } from './dto/create-attribute.input';
import { UpdateAttributeInput } from './dto/update-attribute.input';
import { Attribute } from './entities/attribute.entity';

@Injectable()
export class AttributeService {
  constructor(
    @Inject('ATTRIBUTE_REPOSITORY')
    private attributeRepository: typeof Attribute,
  ) {}
  async create(createAttributeInput: CreateAttributeInput): Promise<Attribute> {
    return await this.attributeRepository.create({
      ...createAttributeInput,
    });
  }

  async findAll(): Promise<Attribute[]> {
    return await this.attributeRepository.findAll<Attribute>();
  }

  async findOne(id: string) {
    return await this.attributeRepository.findOne<Attribute>({
      where: { id: id },
    });
  }

  async findEmail(email: string) {
    return await this.attributeRepository.findOne<Attribute>({
      where: { email: email },
    });
  }

  async update(id: string, data: UpdateAttributeInput): Promise<Attribute> {
    const Attribute = await this.attributeRepository.findOne({
      where: { id: id },
    });
    if (!Attribute) {
      throw new Error('attribute not found');
    }
    await Attribute.update({ ...data });
    await Attribute.save();
    return Attribute;
  }

  async remove(id: string) {
    return await this.attributeRepository.findOne<Attribute>({
      where: { id: id },
    });
  }
}
