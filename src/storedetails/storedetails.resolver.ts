import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StoredetailsService } from './storedetails.service';
import { Storedetail } from './entities/storedetail.entity';
import { CreateStoredetailInput } from './dto/create-storedetail.input';
import { UpdateStoredetailInput } from './dto/update-storedetail.input';

@Resolver(() => Storedetail)
export class StoredetailsResolver {
  constructor(private readonly storedetailsService: StoredetailsService) {}

  @Mutation(() => Storedetail)
  createStoredetail(@Args('createStoredetailInput') createStoredetailInput: CreateStoredetailInput) {
    return this.storedetailsService.create(createStoredetailInput);
  }

  @Query(() => [Storedetail], { name: 'storedetails' })
  findAll() {
    return this.storedetailsService.findAll();
  }

  @Query(() => Storedetail, { name: 'storedetail' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.storedetailsService.findOne(id);
  }

  @Mutation(() => Storedetail)
  updateStoredetail(@Args('updateStoredetailInput') updateStoredetailInput: UpdateStoredetailInput) {
    return this.storedetailsService.update(updateStoredetailInput.id, updateStoredetailInput);
  }

  @Mutation(() => Storedetail)
  removeStoredetail(@Args('id', { type: () => Int }) id: number) {
    return this.storedetailsService.remove(id);
  }
}
