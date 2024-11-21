import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SalesService } from './sales.service';
import { CreateSaleInput } from './dto/create-sale.input';
import { UpdateSaleInput } from './dto/update-sale.input';

@Resolver('Sale')
export class SalesResolver {
  constructor(private readonly salesService: SalesService) {}

  @Mutation('createSale')
  async create(@Args('createSaleInput') createSaleInput: CreateSaleInput) {
    return await this.salesService.create(createSaleInput);
  }

  @Query('sales')
  async findAll() {
    return await this.salesService.findAll();
  }

  @Query('sale')
  async findOne(@Args('id') id: number) {
    return await this.salesService.findOne(id);
  }

  @Mutation('updateSale')
  async update(@Args('updateSaleInput') updateSaleInput: UpdateSaleInput) {
    return await this.salesService.update(updateSaleInput.id, updateSaleInput);
  }

  @Mutation('removeSale')
  async remove(@Args('id') id: number) {
    return await this.salesService.remove(id);
  }
}
