import { CreateCardInput } from './create-card.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCardInput extends PartialType(CreateCardInput) {
  id: number;
}
