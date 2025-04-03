import { Field, InputType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';
import { PartialType } from '@nestjs/mapped-types';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => String)
  id: string;
}
