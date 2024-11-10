import { CreateVariantInput } from './create-variant.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateVariantInput extends PartialType(CreateVariantInput) {
  id: number;
}
