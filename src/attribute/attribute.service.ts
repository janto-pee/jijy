import { Inject, Injectable } from '@nestjs/common';
import { CreateAttributeInput } from './dto/create-attribute.input';
import { UpdateAttributeInput } from './dto/update-attribute.input';
import { Repository } from 'typeorm';
import { Address } from 'src/address/entities/address.entity';

@Injectable()
export class AttributeService {
  constructor(
    @Inject('ATTRIBUTE_REPOSITORY')
    private attributeRepository: Repository<Address>,
  ) {}
  create(createAttributeInput: CreateAttributeInput) {
    return 'This action adds a new attribute';
  }

  findAll() {
    return `This action returns all attribute`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attribute`;
  }

  update(id: number, updateAttributeInput: UpdateAttributeInput) {
    return `This action updates a #${id} attribute`;
  }

  remove(id: number) {
    return `This action removes a #${id} attribute`;
  }
}
