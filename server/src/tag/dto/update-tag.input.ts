import { Field, InputType } from '@nestjs/graphql';
import { CreateTagInput } from './create-tag.input';
import { PartialType } from '@nestjs/mapped-types';

@InputType()
export class UpdateTagInput extends PartialType(CreateTagInput) {
  @Field(() => String)
  id: string;
}
