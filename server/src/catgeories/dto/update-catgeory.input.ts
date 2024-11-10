import { CreateCatgeoryInput } from './create-catgeory.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCatgeoryInput extends PartialType(CreateCatgeoryInput) {
  id: number;
}
