import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';

@Resolver('Cart')
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation('createCart')
  async create(@Args('createCartInput') createCartInput: CreateCartInput) {
    return await this.cartService.create(createCartInput);
  }

  @Query('carts')
  async findAll() {
    return await this.cartService.findAll();
  }

  @Query('cart')
  async findOne(@Args('id') id: number) {
    return await this.cartService.findOne(id);
  }

  @Mutation('updateCart')
  async update(@Args('updateCartInput') updateCartInput: UpdateCartInput) {
    return await this.cartService.update(updateCartInput.id, updateCartInput);
  }

  @Mutation('removeCart')
  async remove(@Args('id') id: number) {
    return await this.cartService.remove(id);
  }
}
