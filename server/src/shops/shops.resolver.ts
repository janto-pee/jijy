import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ShopsService } from './shops.service';
import { CreateShopInput } from './dto/create-shop.input';
import { UpdateShopInput } from './dto/update-shop.input';

@Resolver('Shop')
export class ShopsResolver {
  constructor(private readonly shopsService: ShopsService) {}

  @Mutation('createShop')
  create(@Args('createShopInput') createShopInput: CreateShopInput) {
    return this.shopsService.create(createShopInput);
  }

  @Query('shops')
  findAll() {
    return this.shopsService.findAll();
  }

  @Query('shop')
  findOne(@Args('id') id: number) {
    return this.shopsService.findOne(id);
  }

  @Mutation('updateShop')
  update(@Args('updateShopInput') updateShopInput: UpdateShopInput) {
    return this.shopsService.update(updateShopInput.id, updateShopInput);
  }

  @Mutation('removeShop')
  remove(@Args('id') id: number) {
    return this.shopsService.remove(id);
  }
}
