import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SalesService } from './sales.service';
import { CreateSaleInput } from './dto/create-sale.input';
import { UpdateSaleInput } from './dto/update-sale.input';

@Resolver('Sale')
export class SalesResolver {
  constructor(private readonly salesService: SalesService) {}

  @Mutation('createSale')
  create(@Args('createSaleInput') createSaleInput: CreateSaleInput) {
    return this.salesService.create(createSaleInput);
  }

  @Query('sales')
  findAll() {
    return this.salesService.findAll();
  }

  @Query('sale')
  findOne(@Args('id') id: number) {
    return this.salesService.findOne(id);
  }

  @Mutation('updateSale')
  update(@Args('updateSaleInput') updateSaleInput: UpdateSaleInput) {
    return this.salesService.update(updateSaleInput.id, updateSaleInput);
  }

  @Mutation('removeSale')
  remove(@Args('id') id: number) {
    return this.salesService.remove(id);
  }
}
