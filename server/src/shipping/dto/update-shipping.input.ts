import { CreateShippingInput } from './create-shipping.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateShippingInput extends PartialType(CreateShippingInput) {
  id: number;
}
