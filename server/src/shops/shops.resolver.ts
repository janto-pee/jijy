import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ShopsService } from './shops.service';
import { CreateShopInput } from './dto/create-shop.input';
import { UpdateShopInput } from './dto/update-shop.input';

@Resolver('Shop')
export class ShopsResolver {
  constructor(private readonly shopsService: ShopsService) {}

  @Mutation('createShop')
  async create(@Args('createShopInput') createShopInput: CreateShopInput) {
    return await this.shopsService.create(createShopInput);
  }

  @Query('shops')
  async findAll() {
    return await this.shopsService.findAll();
  }

  @Query('shop')
  async findOne(@Args('id') id: number) {
    return await this.shopsService.findOne(id);
  }

  @Mutation('updateShop')
  async update(@Args('updateShopInput') updateShopInput: UpdateShopInput) {
    return await this.shopsService.update(updateShopInput.id, updateShopInput);
  }

  @Mutation('removeShop')
  async remove(@Args('id') id: number) {
    return await this.shopsService.remove(id);
  }
}
