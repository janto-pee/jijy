import { CreateVariantsOptionInput } from './create-variants-option.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateVariantsOptionInput extends PartialType(CreateVariantsOptionInput) {
  id: number;
}
