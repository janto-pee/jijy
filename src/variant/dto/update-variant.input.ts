import { Field, InputType } from '@nestjs/graphql';
import { CreateVariantInput } from './create-variant.input';
import { PartialType } from '@nestjs/mapped-types';

@InputType()
export class UpdateVariantInput extends PartialType(CreateVariantInput) {
  @Field(() => String)
  id: string;
}
