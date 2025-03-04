import { Inject, Injectable } from '@nestjs/common';
import { CreateShopInput } from './dto/create-shop.input';
import { UpdateShopInput } from './dto/update-shop.input';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopsService {
  constructor(
    @Inject('SHOPS_REPOSITORY')
    private shopsRepository: Repository<Shop>,
  ) {}
  create(createShopInput: CreateShopInput) {
    return 'This action adds a new shop';
  }

  findAll() {
    return `This action returns all shops`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shop`;
  }

  update(id: number, updateShopInput: UpdateShopInput) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}
