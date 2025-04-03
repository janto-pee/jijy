import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVariantInput {
  @Field()
  name: string;

  @Field()
  icon: string;
}
