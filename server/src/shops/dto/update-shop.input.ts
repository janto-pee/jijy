import { CreateShopInput } from './create-shop.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateShopInput extends PartialType(CreateShopInput) {
  id: number;
}
