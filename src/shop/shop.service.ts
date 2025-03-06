import { Inject, Injectable } from '@nestjs/common';
import { CreateShopInput } from './dto/create-shop.input';
import { UpdateShopInput } from './dto/update-shop.input';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopService {
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

  async findOne(id: string): Promise<Shop> {
    const shop = await this.ShopsRepository.findOne<Shop>({
      where: { id: id },
    });
    if (!shop) {
      throw new Error();
    }
    return shop;
  }

  async findEmail(email: string): Promise<Shop> {
    const shop = await this.ShopsRepository.findOne<Shop>({
      where: { email: email },
    });
    if (!shop) {
      throw new Error();
    }
    return shop;
  }

  async update(id: string, data: UpdateShopInput): Promise<Shop> {
    const shop = await this.ShopsRepository.findOne({
      where: { id: id },
    });
    if (!shop) {
      throw new Error('Shop not found');
    }
    await shop.update({ ...data });
    await shop.save();
    return shop;
  }

  async remove(id: string): Promise<Shop> {
    const shop = await this.ShopsRepository.findOne<Shop>({
      where: { id: id },
    });
    if (!shop) {
      throw new Error('Shop not found');
    }
    await shop.destroy;
    return shop;
  }
}
