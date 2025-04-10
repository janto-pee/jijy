import { CreateImageInput } from './create-image.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateImageInput extends PartialType(CreateImageInput) {
  @Field(() => String)
  id: string;
}
