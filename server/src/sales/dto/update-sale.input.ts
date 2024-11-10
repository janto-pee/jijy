import { CreateSaleInput } from './create-sale.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSaleInput extends PartialType(CreateSaleInput) {
  id: number;
}
