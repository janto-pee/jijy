import { Inject, Injectable } from '@nestjs/common';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @Inject('CARTS_REPOSITORY')
    private CartsRepository: typeof Cart,
  ) {}
  async create(createCartInput: CreateCartInput): Promise<Cart> {
    return await this.CartsRepository.create({
      ...createCartInput,
    });
  }

  async findAll(): Promise<Cart[]> {
    return await this.CartsRepository.findAll<Cart>();
  }

  async findOne(id: number): Promise<Cart> {
    return await this.CartsRepository.findOne<Cart>({
      where: { id: id },
    });
  }

  async findEmail(email: String): Promise<Cart> {
    return await this.CartsRepository.findOne<Cart>({
      where: { email: email },
    });
  }

  async update(id: number, data: UpdateCartInput): Promise<Cart> {
    const Cart = await this.CartsRepository.findOne({
      where: { id: id },
    });
    if (!Cart) {
      throw new Error('attribute not found');
    }
    await Cart.update({ ...data });
    await Cart.save();
    return Cart;
  }

  async remove(id: number): Promise<Cart> {
    return await this.CartsRepository.findOne<Cart>({
      where: { id: id },
    });
  }
}
