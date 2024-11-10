import { CreateBrandInput } from './create-brand.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBrandInput extends PartialType(CreateBrandInput) {
  id: number;
}
