import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CardService } from './card.service';
import { CreateCardInput } from './dto/create-card.input';
import { UpdateCardInput } from './dto/update-card.input';

@Resolver('Card')
export class CardResolver {
  constructor(private readonly cardService: CardService) {}

  @Mutation('createCard')
  async create(@Args('createCardInput') createCardInput: CreateCardInput) {
    return await this.cardService.create(createCardInput);
  }

  @Query('cards')
  async findAll() {
    return await this.cardService.findAll();
  }

  @Query('card')
  async findOne(@Args('id') id: number) {
    return await this.cardService.findOne(id);
  }

  @Mutation('updateCard')
  async update(@Args('updateCardInput') updateCardInput: UpdateCardInput) {
    return await this.cardService.update(updateCardInput.id, updateCardInput);
  }

  @Mutation('removeCard')
  async remove(@Args('id') id: number) {
    return await this.cardService.remove(id);
  }
}
