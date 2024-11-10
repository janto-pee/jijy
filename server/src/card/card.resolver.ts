import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CardService } from './card.service';
import { CreateCardInput } from './dto/create-card.input';
import { UpdateCardInput } from './dto/update-card.input';

@Resolver('Card')
export class CardResolver {
  constructor(private readonly cardService: CardService) {}

  @Mutation('createCard')
  create(@Args('createCardInput') createCardInput: CreateCardInput) {
    return this.cardService.create(createCardInput);
  }

  @Query('card')
  findAll() {
    return this.cardService.findAll();
  }

  @Query('card')
  findOne(@Args('id') id: number) {
    return this.cardService.findOne(id);
  }

  @Mutation('updateCard')
  update(@Args('updateCardInput') updateCardInput: UpdateCardInput) {
    return this.cardService.update(updateCardInput.id, updateCardInput);
  }

  @Mutation('removeCard')
  remove(@Args('id') id: number) {
    return this.cardService.remove(id);
  }
}
