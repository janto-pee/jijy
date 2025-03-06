import { Field, InputType } from '@nestjs/graphql';
import { CreateShopInput } from './create-shop.input';
import { PartialType } from '@nestjs/mapped-types';

@InputType()
export class UpdateShopInput extends PartialType(CreateShopInput) {
  @Field(() => String)
  id: string;
}
