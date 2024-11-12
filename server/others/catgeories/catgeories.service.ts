import { Injectable } from '@nestjs/common';
import { CreateCatgeoryInput } from './dto/create-catgeory.input';
import { UpdateCatgeoryInput } from './dto/update-catgeory.input';

@Injectable()
export class CatgeoriesService {
  create(createCatgeoryInput: CreateCatgeoryInput) {
    return 'This action adds a new catgeory';
  }

  findAll() {
    return `This action returns all catgeories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catgeory`;
  }

  update(id: number, updateCatgeoryInput: UpdateCatgeoryInput) {
    return `This action updates a #${id} catgeory`;
  }

  remove(id: number) {
    return `This action removes a #${id} catgeory`;
  }
}
