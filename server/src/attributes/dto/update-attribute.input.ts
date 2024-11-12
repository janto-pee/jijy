import { CreateAttributeInput } from './create-attribute.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAttributeInput extends PartialType(CreateAttributeInput) {
  id: number;
}
