import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ShopService } from './shop.service';
import { CreateShopInput } from './dto/create-shop.input';
import { UpdateShopInput } from './dto/update-shop.input';
import { Shop } from './entities/shop.entity';

@Resolver(() => Shop)
export class ShopResolver {
  constructor(private readonly shopService: ShopService) {}

  @Mutation(() => Shop)
  async createShop(@Args('createShopInput') createShopInput: CreateShopInput) {
    return (await this.shopService.create(createShopInput)).dataValues;
  }

  @Query(() => [Shop], { name: 'Shops' })
  async findAll() {
    return await this.shopService.findAll();
  }

  @Query(() => Shop, { name: 'Shop' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return (await this.shopService.findOne({ id: id })).dataValues;
  }

  @Mutation(() => Shop)
  async updateShop(@Args('updateShopInput') updateShopInput: UpdateShopInput) {
    return (await this.shopService.update(updateShopInput.id, updateShopInput))
      .dataValues;
  }

  @Mutation(() => Shop)
  async removeShop(@Args('id', { type: () => String }) id: string) {
    return (await this.shopService.remove(id)).dataValues;
  }
}
