import { Inject, Injectable } from '@nestjs/common';
import { CreateShopInput } from './dto/create-shop.input';
import { UpdateShopInput } from './dto/update-shop.input';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopsService {
  constructor(
    @Inject('SHOP_REPOSITORY')
    private ShopsRepository: typeof Shop,
  ) {}
  async create(createShopInput: CreateShopInput): Promise<Shop> {
    return await this.ShopsRepository.create({
      ...createShopInput,
    });
  }

  async findAll(): Promise<Shop[]> {
    return await this.ShopsRepository.findAll<Shop>();
  }

  async findOne(id: number): Promise<Shop> {
    return await this.ShopsRepository.findOne<Shop>({
      where: { id: id },
    });
  }

  async findEmail(email: String): Promise<Shop> {
    return await this.ShopsRepository.findOne<Shop>({
      where: { email: email },
    });
  }

  async update(where: any, data: UpdateShopInput): Promise<Shop> {
    const Shop = await this.ShopsRepository.findOne({
      where: { ...where },
    });
    await Shop.update({ ...data });
    await Shop.save();
    return Shop;
  }

  async remove(id: number): Promise<Shop> {
    return await this.ShopsRepository.findOne<Shop>({
      where: { id: id },
    });
  }
}
