import { CreateAttributeInput } from './create-attribute.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAttributeInput extends PartialType(CreateAttributeInput) {
  @Field(() => String)
  id: string;
}
