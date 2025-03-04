import { Inject, Injectable } from '@nestjs/common';
import { CreateStoredetailInput } from './dto/create-storedetail.input';
import { UpdateStoredetailInput } from './dto/update-storedetail.input';
import { Storedetail } from './entities/storedetail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoredetailsService {
  constructor(
    @Inject('STOREDETAILS_REPOSITORY')
    private storedetailRepository: Repository<Storedetail>,
  ) {}
  create(createStoredetailInput: CreateStoredetailInput) {
    return 'This action adds a new storedetail';
  }

  findAll() {
    return `This action returns all storedetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storedetail`;
  }

  update(id: number, updateStoredetailInput: UpdateStoredetailInput) {
    return `This action updates a #${id} storedetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} storedetail`;
  }
}
