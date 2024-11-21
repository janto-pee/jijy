import { Inject, Injectable } from '@nestjs/common';
import { CreateShippingInput } from './dto/create-shipping.input';
import { UpdateShippingInput } from './dto/update-shipping.input';
import { Shipping } from './entities/shipping.entity';

@Injectable()
export class ShippingService {
  constructor(
    @Inject('SHIPPING_REPOSITORY')
    private ShippingsRepository: typeof Shipping,
  ) {}
  async create(createShippingInput: CreateShippingInput): Promise<Shipping> {
    return await this.ShippingsRepository.create({
      ...createShippingInput,
    });
  }

  async findAll(): Promise<Shipping[]> {
    return await this.ShippingsRepository.findAll<Shipping>();
  }

  async findOne(id: number): Promise<Shipping> {
    return await this.ShippingsRepository.findOne<Shipping>({
      where: { id: id },
    });
  }

  async findEmail(email: String): Promise<Shipping> {
    return await this.ShippingsRepository.findOne<Shipping>({
      where: { email: email },
    });
  }

  async update(id: number, data: UpdateShippingInput): Promise<Shipping> {
    const Shipping = await this.ShippingsRepository.findOne({
      where: { id: id },
    });
    if (!Shipping) {
      throw new Error('Shipping not found');
    }
    await Shipping.update({ ...data });
    await Shipping.save();
    return Shipping;
  }

  async remove(id: number): Promise<Shipping> {
    const shipping = await this.ShippingsRepository.findOne<Shipping>({
      where: { id: id },
    });
    await shipping.destroy();
    return shipping;
  }
}
